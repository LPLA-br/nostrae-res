import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entidade';
import { CreateUserDto } from './dto/criarUsuario.dto';

@Injectable()
export class UsuarioService
{

  private readonly id: number = 2;

  constructor(
    @InjectRepository(Usuario) private usuariosRepositorio: Repository<Usuario>,
  )
  {}

  /** Cria usuário único uma vez.
  *   @param {usuario} usuario - dados de usuário
  *   @
  * */
  async salvarUsuarioUnico( usuario: CreateUserDto ): Promise<Usuario|string>
  {
    const verif = this.usuariosRepositorio.find();

    if( (await verif).length > 0 )
    {
      return '{"msg":"usuario unico existe"}';
    }

    const novoUsuario = this.usuariosRepositorio.create(
    {
      id:         this.id,
      username:   usuario.username,
      hashsenha:  usuario.hashsenha,
      sal:        usuario.sal
    });

    return this.usuariosRepositorio.save( novoUsuario );
  }

  /** Retorna nome do usuário ou string vazia.
  *   @returns {string} username
  * */
  async getUsername(): Promise<string>
  {
    return (await this.usuariosRepositorio.findOne({where:{id:this.id}})).username.toString();
  }

  /** @returns retorna true ou false.
  * */
  async usuarioExiste(): Promise<boolean>
  {
    const usuario = this.usuariosRepositorio.findOne({});
    if ( (await this.usuariosRepositorio.findOne({where:{id:this.id}})).id == this.id )
    {
      return true;
    }
    return false;
  }

  /** Retorna hash do usuário armazenado.
   * @returns {string} string vazia ou hashsenha do usuário único.
  * */
  async obterHash(): Promise<string>
  {
    return (await this.usuariosRepositorio.findOne({where:{id:this.id}})).hashsenha.toString();
  }

  async obterSal(): Promise<string>
  {
    return (await this.usuariosRepositorio.findOne({where:{id:this.id}})).hashsenha.toString();
  }

  async salvarToken( token: string ): Promise<boolean>
  {
    try
    {
      this.usuariosRepositorio.update({id:this.id},{token:token});
      return true;
    }
    catch( reason )
    {
      return reason;
    }
  }

  async deletarToken(): Promise<void>
  {
    try
    {
      this.usuariosRepositorio.update({id:this.id},{token:null});
    }
    catch( reason )
    {
      console.log( reason );
    }
  }

}


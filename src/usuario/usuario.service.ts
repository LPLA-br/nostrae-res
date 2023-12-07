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
  *   @returns {string} string json com msg.
  * */
  async salvarUsuarioUnico( usuario: CreateUserDto ): Promise<Usuario|string>
  {
    try
    {
      const verif = await this.usuariosRepositorio.find();

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
    catch( err )
    {
			throw new Error( err );
    }
  }

  /** Retorna nome do usuário ou string vazia.
  *   @returns {string} username
  * */
  async getUsername(): Promise<string>
  {
    try
    {
      return (await this.usuariosRepositorio.findOne({where:{id:this.id}})).username.toString();
    }
    catch( err )
    {
			throw new Error( err );
    }
  }

  /** Retorna a existência ou não do usuário único.
   *  @returns retorna true ou false.
  * */
  async usuarioExiste(): Promise<boolean>
  {
    try
    {
      if ( (await this.usuariosRepositorio.findOne({where:{id:this.id}})).id == this.id )
      {
        return true;
      }
      return false;
    }
    catch( err )
    {
			throw new Error( err );
    }
  }

  /** Retorna hash do usuário armazenado.
   * @returns {string} string vazia ou hashsenha do usuário único.
  * */
  async obterHash(): Promise<string>
  {
    try
    {
      return (await this.usuariosRepositorio.findOne({where:{id:this.id}})).hashsenha.toString();
    }
    catch(err)
    {
			throw new Error( err );
    }
  }

  /** Fornece o sal para que usuário gere seu hash.
   * @returns {string} sal do usuário único.
   * */
  async obterSal(): Promise<string>
  {
    try
    {
      return (await this.usuariosRepositorio.findOne({where:{id:this.id}})).sal.toString();
    }
    catch( err )
    {
			throw new Error( err );
    }
  }

  async obterToken(): Promise<string>
  {
    try
    {
      const usuario = await this.usuariosRepositorio.findOne({where:{id:this.id}});
      return usuario.token;
    }
    catch(err)
    {
			throw new Error( err );
    }
  }

  async salvarToken( token: string ): Promise<boolean>
  {
    try
    {
      await this.usuariosRepositorio.update({id:this.id},{token:token});
      return true;
    }
    catch( err )
    {
			throw new Error( err );
    }
  }

  async deletarToken(): Promise<boolean>
  {
    try
    {
      await this.usuariosRepositorio.update({id:this.id},{token:null});
      return true;
    }
    catch( err )
    {
			throw new Error( err );
    }
  }

}


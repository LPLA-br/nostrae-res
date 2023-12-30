import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entidade';
import { CreateUserDto } from './dto/criarUsuario.dto';

@Injectable()
export class UsuarioService
{

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

      if( (verif).length > 0 )
      {
        return '{"statusCode":204,"msg":"usuario único já registrado"}';
      }

      const novoUsuario = this.usuariosRepositorio.create(
      {
        username:   usuario.username,
        hashsenha:  'campo_descartado',
        sal:        'campo_descartado',
        senha:      usuario.senha
      });

      return this.usuariosRepositorio.save( novoUsuario );
    }
    catch( err )
    {
			throw new InternalServerErrorException(
      {
        statusCode: 500,
        msg: 'salvarUsuarioUnico() falhou',
        err: err
      });
    }
  }

  /** Retorna lista de usuários*/
  async usuarios(): Promise<Usuario[]>
  {
    return this.usuariosRepositorio.find();
  }

  /** Retorna nome do usuário ou string vazia.
  *   @returns {string} username
  * */
  async getUsername(): Promise<string>
  {
    try
    {
      const usuario = await this.usuariosRepositorio.find();
      if ( usuario.length == 1 )
      {
        return (await this.usuariosRepositorio.findOne({where:{id:usuario[0].id}})).username.toString();
      }
      return '';
    }
    catch( err )
    {
			throw new InternalServerErrorException({
        statusCode: 500,
        msg: 'getUsername() falhou',
        err: err
      });
    }
  }

  /** Retorna a existência ou não do usuário único.
   *  @returns retorna true ou false.
  * */
  async usuarioExiste(): Promise<boolean>
  {
    try
    {
      const usuario = await this.usuariosRepositorio.find();
      if ( usuario.length > 0 )
      {
        return true;
      }
      return false;
    }
    catch( err )
    {
			throw new InternalServerErrorException({
        statusCode: 500,
        msg: 'usuarioExiste() falhou',
        err: err
      });
    }
  }

  /** Retorna hash do usuário armazenado.
   * @returns {string} string vazia ou hashsenha do usuário único.
  * */
  async obterHash(): Promise<string>
  {
    try
    {
      const usuario = await this.usuariosRepositorio.find();
      if ( usuario.length == 1 )
      {
        return usuario[0].hashsenha.toString();
      }
      return '';
    }
    catch(err)
    {
			throw new InternalServerErrorException({
        statusCode: 500,
        msg: 'obterHash() falhou',
        err: err
      });
    }
  }

  /** Fornece o sal para que usuário gere seu hash.
   * @returns {string} sal do usuário único.
   * */
  async obterSal(): Promise<string>
  {
    try
    {
      const usuario = await this.usuariosRepositorio.find();
      if ( usuario.length == 1 )
      {
        return `${usuario[0].sal.toString()}`
      }
      return '';
    }
    catch( err )
    {
			throw new InternalServerErrorException({
        statusCode: 500,
        msg: 'obterSal() falhou',
        err: err
      });
    }
  }

  /** Retorna senha plana ou string vazia */
  async obterSenhaPlana()
  {
    try
    {
      let usuarios = await this.usuariosRepositorio.find();
      if ( usuarios.length == 1 )
      {
        return usuarios[0].senha;
      }
      return '';
    }
    catch(err)
    {
			throw new InternalServerErrorException({
        statusCode: 500,
        msg: 'obterSenhaPlana() falhou',
        err: err
      });
    }

  }
}


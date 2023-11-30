import { Controller } from '@nestjs/common';
import { Post, Get, HttpCode, Header } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';


import { CreateUserDto } from './dto/criarUsuario.dto';
import { Usuario } from './entities/usuario.entidade';

@Controller('usuario')
export class UsuarioController
{
  constructor(
    private servicoUsuario :UsuarioService
  )
  {}

  /** Cria a conta única de usuário
  *   @param {CreateUserDto} createUserDto - dados para validacao.
  *   @returns {CreateUserDto} representação do usuário.
  * */
  @Post()
  @HttpCode(201)
  async criarUsuarioUnico(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto
  ): Promise<Usuario|string>
  {
    try
    {
      return await this.servicoUsuario.salvarUsuarioUnico( createUserDto );
    }
    catch( err )
    {
      throw new InternalServerErrorException({},err);
    }
  }

  @Get()
  async enviarSal(): Promise<string>
  {
    try
    {
      return await this.servicoUsuario.obterSal();
    }
    catch( err )
    {
      throw err;
    }
  }

}

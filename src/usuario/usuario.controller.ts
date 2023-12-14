import { Controller } from '@nestjs/common';
import { Post, Get, HttpCode, Header } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

import { CreateUserDto } from './dto/criarUsuario.dto';
import { Usuario } from './entities/usuario.entidade';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

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
  **/
  @Post()
  @HttpCode(201)
  async criarUsuarioUnico(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto
  ): Promise<Usuario|string>
  {
    return await this.servicoUsuario.salvarUsuarioUnico( createUserDto );
  }

  @Get()
  @UseGuards(AuthGuard)
  async enviarSal(): Promise<string>
  {
    return await this.servicoUsuario.obterSal();
  }

  /* Método não público */
  @Get('lista')
  async listaUsuarios(): Promise<Usuario[]>
  {
    return this.servicoUsuario.usuarios();
  }

}

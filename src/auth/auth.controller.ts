import { Controller } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { AuthServiceUsuario } from './auth.service';
import { ValidationPipe } from '@nestjs/common';

import { UserHashDto } from './dto/hashsenha.dto';

@Controller('auth')
export class AuthController
{
  constructor( private authServico: AuthServiceUsuario )
  {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async entrarSessao( @Body(new ValidationPipe()) hashsenha: UserHashDto ): Promise<any>
  {
    return this.authServico.validarParaSessao( hashsenha.hashsenha );
  }

  @Delete('unlogin')
  @HttpCode(HttpStatus.OK)
  async encerrarSessao(): Promise<any>
  {
    return this.authServico.encerrarSessao();
  }

}

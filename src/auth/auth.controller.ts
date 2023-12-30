import { Controller } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { UserHashDto } from './dto/hashsenha.dto';
import { AuthServiceUsuario } from './auth.service';

@Controller('auth')
export class AuthController
{
  constructor( private authServico: AuthServiceUsuario )
  {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async entrarSessao(
    @Body(new ValidationPipe()) hashsenha: UserHashDto,
    @Res() res: Response
  ): Promise<any>
  {
			const auth = await this.authServico.validarParaSessao( hashsenha.senha );
			res.header("Authentication", auth?.acess_token ).json( auth );
  }
}


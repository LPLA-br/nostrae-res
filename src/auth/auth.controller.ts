import { Controller } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NotImplementedException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { UserHashDto } from './dto/hashsenha.dto';

import { AuthServiceUsuario } from './auth.service';
import { AuthGuard } from './auth.guard';

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
			const auth = await this.authServico.validarParaSessao( hashsenha?.hashsenha );
			res
			.header("Authentication", auth.acess_token )
			.json( auth );
  }

  @Get()
	@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async none(): Promise<any>
  {
		throw new NotImplementedException();
	}
}


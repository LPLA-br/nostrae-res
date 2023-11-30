import { Controller } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';
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
  async entrarSessao(
    @Body(new ValidationPipe()) hashsenha: UserHashDto,
    @Res() res: Response
  ): Promise<any>
  {
    try
    {
      const auth = await this.authServico.validarParaSessao( hashsenha.hashsenha );

      if ( auth.acess_token.length > 3 )
      {
        res
        .header("Authentication", auth.acess_token )
        .json( auth );
      }
      else
      {
        res
        .json( auth );
      }
    }
    catch( err )
    {
      throw new InternalServerErrorException({},err);
    }
  }

  @Delete('unlogin')
  @HttpCode(HttpStatus.OK)
  async encerrarSessao(): Promise<any>
  {
    try
    {
      return await this.authServico.encerrarSessao();
    }
    catch(err)
    {
      throw new InternalServerErrorException({},err);
    }
  }

}

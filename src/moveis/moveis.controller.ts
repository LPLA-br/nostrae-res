import { Controller } from '@nestjs/common';
import { Get, Post, Put, Patch } from '@nestjs/common';
import { Body, Req } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { MoveisProvedores } from './moveis.service';
import { Validacao } from './pipes/validacao.pipe';
import { Movel } from './entidades/movel.entidade';
import { CriarRegistroDto } from './dto/criarRegistro.dto';
import { EditarRegistroDto } from './dto/editarRegistro.dto';

@Controller('moveis')
export class MoveisControladoresController
{
  constructor( private moveisProvedores: MoveisProvedores )
  {}

	@Get()
	async listarTodosRegistros( @Req() req: Request )
	{
    try
    {
      return await this.moveisProvedores.buscarTodos( req.header('Authorization') );
    }
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        statusCode:"500",
        msg:"/moveis GET falhou",
        det:err
      });
    }
	}

	@Post()
	async criarRegistro(
    @Req() req: Request,
    @Body(new Validacao()) criarRegistroDto: CriarRegistroDto
  ): Promise<Movel[]|Movel>
	{
    try
    {
		return await this.moveisProvedores.criarRegistro( criarRegistroDto, req.header('Authorization')  );
    }
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        statusCode:"500",
        msg:"/moveis POST falhou",
        det:err
      });
    }
	}

	@Patch()
	async atualizarRegistroParcialmente(
    @Req() req: Request,
    @Body(new Validacao()) editarRegistroDto : EditarRegistroDto
  ): Promise<any>
	{
    try
    {
      return await this.moveisProvedores.editarRegistroDinamicamente( editarRegistroDto, req.header('Authorization') );
    }
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        statusCode:"500",
        msg:"/moveis PATCH falhou",
        det:err
      });
    }
	}

}

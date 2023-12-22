import { Controller } from '@nestjs/common';
import { Get, Post, Patch } from '@nestjs/common';
import { Body, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { MoveisProvedores } from './moveis.service';
import { Validacao } from './pipes/validacao.pipe';
import { Movel } from './entidades/movel.entidade';
import { CriarRegistroDto } from './dto/criarRegistro.dto';
import { EditarRegistroDto } from './dto/editarRegistro.dto';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { Retorno } from './moveis.service';

@Controller('moveis')
export class MoveisControladoresController
{
  constructor( private moveisProvedores: MoveisProvedores )
  {}

	@Get()
  @UseGuards(AuthGuard)
	async listarTodosRegistros( @Req() req: Request )
	{
    return await this.moveisProvedores.buscarTodos( req.header('Authorization') );
	}

	/** Relatório: queryString: anoAquisicao, localizacao, categoria
	* 	Um parâmetro por vêz*/
	@Get('/relatorio')
	@UseGuards(AuthGuard)
	async registroDeTalAno(
		@Query( 'anoAquisicao' ) anoAquisicao: number,
		@Query( 'categoria' ) categoria: string,
		@Query( 'localizacao' ) localizacao: string
	): Promise<any>
	{
		if ( typeof anoAquisicao == 'number' )
			return await this.moveisProvedores.buscarAnoAquisicao( anoAquisicao );
		else if ( typeof categoria == 'string' )
			return await this.moveisProvedores.buscarCategoria( categoria );
		else if ( typeof localizacao == 'string' )
			return await this.moveisProvedores.buscarCategoria( localizacao );
	}

	@Post()
  @UseGuards(AuthGuard)
	async criarRegistro(
    @Body(new Validacao()) criarRegistroDto: CriarRegistroDto
  ): Promise<Retorno>
	{
		return await this.moveisProvedores.criarRegistro( criarRegistroDto );
	}

	@Patch()
  @UseGuards(AuthGuard)
	async atualizarRegistroParcialmente(
    @Body(new Validacao()) editarRegistroDto : EditarRegistroDto
  ): Promise<any>
	{
    return await this.moveisProvedores.editarRegistroDinamicamente( editarRegistroDto );
	}

}

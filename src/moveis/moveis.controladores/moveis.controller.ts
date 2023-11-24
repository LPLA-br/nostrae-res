import { Controller } from '@nestjs/common';
import { Get, Post, Put, Patch } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { MoveisProvedores } from '../moveis.provedores/moveis.service';
import { Validacao } from '../moveis.pipes/validacao.pipe';
import { CriarRegistroDto } from '../dto/criarRegistro.dto';
import { Movel } from '../entidades/movel.entidade';
import { EditarRegistroDto } from '../dto/editarRegistro.dto';

@Controller('moveis')
export class MoveisControladoresController
{
  constructor( private moveisProvedores: MoveisProvedores )
  {}

	@Get()
	async listarTodosRegistros()
	{
    return this.moveisProvedores.buscarTodos();
	}

	@Post()
	async criarRegistro( @Body(new Validacao()) criarRegistroDto: CriarRegistroDto  )
  : Promise<Movel[]|Movel>
	{
		return this.moveisProvedores.criarRegistro( criarRegistroDto  );
	}

	@Patch()
	async atualizarRegistroParcialmente( @Body(new Validacao()) editarRegistroDto : EditarRegistroDto )
	{
		return this.moveisProvedores.editarRegistroDinamicamente( editarRegistroDto );
	}

}

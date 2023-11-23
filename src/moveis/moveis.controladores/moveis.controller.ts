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
	listarTodosRegistros()
	{
    return this.moveisProvedores.buscarTodos();
	}

	/** Retorna representação da entidade armazenada no servidor.
   *  @returns {Movel}
  * */
	@Post()
	criarRegistro( @Body(new Validacao()) criarRegistroDto: CriarRegistroDto  )
  : Movel
	{
		return this.moveisProvedores.criarRegistro( criarRegistroDto  );
	}

	@Patch()
	atualizarRegistroParcialmente( @Body(new Validacao()) editarRegistroDto : EditarRegistroDto )
	{
		return this.moveisProvedores.editarRegistroDinamicamente( editarRegistroDto );
	}

}

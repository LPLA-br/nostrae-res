import { Controller } from '@nestjs/common';
import { Get, Post, Put, Patch } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { MoveisProvedores } from '../moveis.provedores/moveis.service';
import { Validacao } from '../moveis.pipes/validacao.pipe';
import { CriarRegistroDto } from '../dto/criarRegistro.dto';

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

  /** Retorna estado da operação realizada e uma
   *  breve mensagem.
   *  @returns {{status:string,msg:string}}
  * */
	@Post()
	criarRegistro( @Body(new Validacao()) criarRegistroDto: CriarRegistroDto  )
  : {status:string;msg:string}
	{
    if ( this.moveisProvedores.criarRegistro(criarRegistroDto) )
      return {status:'200',msg:'registro criado'};
    else
      return {status:'500',msg:'erro interno'};
	}

	@Put()
	atualizarRegistroCompletamente(): void
	{

	}

	@Patch()
	baixaRegistro(): void
	{

	}
}

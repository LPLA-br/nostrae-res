import { Controller } from '@nestjs/common';
import { Get, Post, Put, Patch } from '@nestjs/common';

@Controller('moveis')
export class MoveisControladoresController
{
	@Get()
	listarTodosRegistros(): string
	{
		
	}

	@Post()
	criarRegistro(): string
	{

	}

	@Put()
	atualizarRegistroCompletamente(): string
	{
		
	}

	@Patch()
	baixaRegistro(): string
	{

	}
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoveisControladoresController } from './moveis.controladores/moveis.controladores.controller';
import { MoveisProvedores } from './moveis.provedores/moveis.provedores';
import { Movel } from './entidades/movel.entidade';

@Module(
	{
		imports: [TypeOrmModule.forFeature([Movel])],
		controllers: [MoveisControladoresController],
		providers: [MoveisProvedores]
	}
)
export class MoveisModule
{
	constructor()
	{

	}
}

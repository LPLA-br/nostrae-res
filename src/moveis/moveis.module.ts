import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoveisControladoresController } from './moveis.controller';
import { MoveisProvedores } from './moveis.service';
import { Movel } from './entidades/movel.entidade';

import { AuthModule } from 'src/auth/auth.module';

@Module(
	{
		imports: [
      TypeOrmModule.forFeature([Movel]),
      AuthModule
    ],
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

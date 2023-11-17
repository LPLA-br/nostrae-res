import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';;
import { MoveisModule } from './moveis/moveis.module';
import { Movel } from './moveis/entidades/movel.entidade';

@Module(
	{
		imports: [
			MoveisModule,
			TypeOrmModule.forRoot({
				type: 'postgres',
				host: '127.0.0.1',
				port: 5432,
				username: 'postgres',
				password: 'rinoceteio',
				database: 'nostraeres',
				entities: [Movel],
				synchronize: true
			})
		],
		controllers: [],
		providers: [],
	}
)
export class AppModule
{
	constructor()
	{}
}

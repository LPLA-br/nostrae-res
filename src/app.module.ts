import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';;
import { MoveisModule } from './moveis/moveis.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Movel } from './moveis/entidades/movel.entidade';
import { Usuario } from './usuario/entities/usuario.entidade';
import { AuthModule } from './auth/auth.module';
require('dotenv/config');

@Module(
	{
		imports: [
			MoveisModule,
      TypeOrmModule.forRoot(
        {
          type:     'postgres',
          host:     process.env.POSTGRES_SERVER,
          port:     5432,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          entities: [
            Movel,
            Usuario
          ],
          /*não utilizar em produção abaixo*/
          synchronize: true,
        }
      ),
      UsuarioModule,
      AuthModule,
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

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceUsuario } from './auth.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entidade';
import { UsuarioModule } from 'src/usuario/usuario.module';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstantes } from 'src/constants';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario]),
    UsuarioModule,
    JwtModule.register(
    {
      global: true,
      secret: jwtConstantes.secret,
      signOptions: { expiresIn: '1200s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthServiceUsuario],
  exports: [AuthServiceUsuario]
})
export class AuthModule {}

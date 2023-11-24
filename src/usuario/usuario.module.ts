import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controllers/usuario.controller';
import { UsuarioService } from './usuario.services/usuario';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from './entities/usuario.entidade';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}

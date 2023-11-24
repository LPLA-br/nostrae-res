import { PickType } from "@nestjs/swagger";

import { CreateUserDto } from './criarUsuario.dto';

// username não necessário para sistema monousuário.
export class Autenticar
extends PickType(CreateUserDto, ['hashsenha'])
{}


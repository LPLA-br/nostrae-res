import { PickType } from "@nestjs/swagger";

import { CreateUserDto } from './criarUsuario.dto';

export class Sal
extends PickType(CreateUserDto, ['username'])
{}

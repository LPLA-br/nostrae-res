import { CreateUserDto } from "src/usuario/dto/criarUsuario.dto";
import { PickType } from "@nestjs/swagger";

export class UserHashDto extends PickType(CreateUserDto, ['senha'])
{}


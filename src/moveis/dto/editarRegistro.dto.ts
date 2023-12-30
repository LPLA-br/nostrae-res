import { CriarRegistroDto } from './criarRegistro.dto';
import { PartialType } from '@nestjs/swagger';

//PartialType() todos campos de outra dto opcionais
export class EditarRegistroDto extends PartialType(CriarRegistroDto)
{}

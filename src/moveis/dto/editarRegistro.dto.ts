import { CriarRegistroDto } from './criarRegistro.dto';
import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsEmpty } from 'class-validator';

//PartialType() todos campos de outra dto opcionais
export class EditarRegistroDto extends PartialType(CriarRegistroDto)
{
	@IsNumber({},{message:'Edição de registro requer campo de id'})
	@IsEmpty({message:'Campo id de edição de registro requer campo id'})
	id: number;
}

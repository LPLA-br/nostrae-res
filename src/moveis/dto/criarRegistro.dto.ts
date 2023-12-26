import {
  IsNotEmpty,
  IsString, IsNumber, IsBoolean
} from 'class-validator';

export class CriarRegistroDto
{

  @IsNotEmpty({message:'campo descricao vazio'})
  @IsString({message:'descricao não string'})
  descricao: string;

  @IsNotEmpty({message:'campo marca vazio'})
  @IsString({message:'marca não string'})
  marca: string;

	@IsNotEmpty({message:'campo categoria vazio'})
	@IsString({message:'categoria não string'})
	categoria: string;

  @IsNotEmpty({message:'campo descricao vazio'})
  @IsNumber({},{message:'anoAquisicao não número'})
  anoAquisicao: number;

  @IsNotEmpty({message:'campo localizacao vazio'})
  @IsString({message:'localizacao não string'})
  localizacao: string;

};


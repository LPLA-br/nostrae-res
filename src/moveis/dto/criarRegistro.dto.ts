import {
  IsEmpty,
  IsString, IsNumber, IsBoolean
} from 'class-validator';

export class CriarRegistroDto
{

  @IsEmpty({message:'campo descricao vazio'})
  @IsString({message:'descricao não string'})
  descricao: string;

  @IsEmpty({message:'campo marca vazio'})
  @IsString({message:'marca não string'})
  marca: string;

  @IsEmpty({message:'campo descricao vazio'})
  @IsNumber({},{message:'anoAquisicao não número'})
  anoAquisicao: number;

  @IsEmpty({message:'campo localizacao vazio'})
  @IsString({message:'localizacao não string'})
  localizacao: string;

  @IsEmpty({message:'campo utilizavel vazio'})
  @IsBoolean({message:'utilizavel não boolean'})
  utilizavel: boolean;

};


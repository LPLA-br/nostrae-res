import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto
{
  @IsNotEmpty({message:'username deve ser incluido'})
  @IsString({message:'username deve ser string'})
  username: string;

  @IsNotEmpty({message:'hash da senha não presente'})
  @IsString({message:'hash da senha deve ser string'})
  senha: string;
}


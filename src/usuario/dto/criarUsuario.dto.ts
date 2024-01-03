import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto
{
  @IsNotEmpty({message:'username não presente'})
  @IsString({message:'username deve ser string'})
  username: string;

  @IsNotEmpty({message:'senha não presente'})
  @IsString({message:'senha deve ser string'})
  senha: string;
}


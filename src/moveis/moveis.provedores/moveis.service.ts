import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movel } from '../entidades/movel.entidade';
import { CriarRegistroDto } from '../dto/criarRegistro.dto';

@Injectable()
export class MoveisProvedores
{
	constructor( @InjectRepository(Movel) private movelRepo: Repository<Movel>  )
	{}

	buscarTodos(): Promise<Movel []>
	{
		return this.movelRepo.find();
	}

  criarRegistro( registro: CriarRegistroDto ): boolean
  {
    try
    {
      this.movelRepo.create(registro);
      return true;
    }
    catch( err )
    {
      return false;
    }
  }
}

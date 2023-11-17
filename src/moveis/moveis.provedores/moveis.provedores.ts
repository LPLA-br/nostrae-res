import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movel } from '../entidades/movel.entidade';

@Injectable()
export class MoveisProvedores
{
	constructor( @InjectRepository(Movel) private movelRepo: Repository<Movel>  )
	{}

	buscarTodos(): Promise<Movel []>
	{
		return this.movelRepo.find();
	}
}

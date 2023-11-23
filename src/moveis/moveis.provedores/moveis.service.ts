import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movel } from '../entidades/movel.entidade';
import { CriarRegistroDto } from '../dto/criarRegistro.dto';
import { EditarRegistroDto } from '../dto/editarRegistro.dto';

@Injectable()
export class MoveisProvedores
{
	constructor( @InjectRepository(Movel) private movelRepo: Repository<Movel>  )
	{}

	buscarTodos(): Promise<Movel []>
	{
		return this.movelRepo.find();
	}

  criarRegistro( registro: CriarRegistroDto ): Movel
  {
		return this.movelRepo.create(registro);
  }

	/** Edita parcialmente pelo id
	 *  @param {EditarRegistroDto} registroParcial - objeto com campos editatum.
	* */
	editarRegistroDinamicamente( registroParcial: EditarRegistroDto )
	{
		return this.movelRepo.update('id', registroParcial );
	}
}

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

	/* Retorna matriz com todos os registros.
	* **/
	buscarTodos(): Promise<Movel []>
	{
		return this.movelRepo.find();
	}

  criarRegistro( registro: CriarRegistroDto ): Promise<Movel>
  {
		const reg = this.movelRepo.create({
			descricao:	 registro.descricao,
			marca:			 registro.marca,
			categoria:	 registro.categoria,
			anoAquisicao:registro.anoAquisicao,
			localizacao: registro.localizacao,
			utilizavel:	 registro.utilizavel
		});

		return this.movelRepo.save( reg );
	}

	/** Utiliza dto parcial para atualização parcial do registro (datamask).
	 *  @param {EditarRegistroDto} registroParcial - objeto com campos editatum.
	* */
	editarRegistroDinamicamente( registroParcial: EditarRegistroDto )
	{
		return this.movelRepo.update('id', registroParcial );
	}
}

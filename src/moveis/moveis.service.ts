import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movel } from './entidades/movel.entidade';
import { CriarRegistroDto } from './dto/criarRegistro.dto';
import { EditarRegistroDto } from './dto/editarRegistro.dto';

export type Retorno = {
  status: number,
  result: Movel[] | Movel
};

@Injectable()
export class MoveisProvedores
{
	constructor(
    @InjectRepository(Movel) private movelRepo: Repository<Movel>
  )
	{}

	/** Retorna matriz com todos os registros.
   * @param {string} authToken - token enviado.
   * @returns {Movel[]|string}
	* **/
	async buscarTodos( authToken:string ): Promise<Retorno|string>
	{
    try
    {
      return {
        status: 200,
        result: await this.movelRepo.find()
      };
    }
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        status: 500,
        msg: 'buscarTodos() falhou',
        det: err
      });
    }
	}

	async buscarAnoAquisicao( anoAquisicao: number ): Promise<Retorno|string>
	{
		try
		{
			return {
				status: 200,
				result: await this.movelRepo.find({where:{anoAquisicao:anoAquisicao}})
			};
		}
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        status: 500,
        msg: '',
        det: err
      });
    }
	}

	async buscarCategoria( categoria: string ): Promise<Retorno|string>
	{
		try
		{
			return {
				status: 200,
				result: await this.movelRepo.find({where:{categoria:categoria}})
			};
		}
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        status: 500,
        msg: '',
        det: err
      });
    }
	}

	async buscarLocalizacao( localizacao: string ): Promise<Retorno|string>
	{
		try
		{
			return {
				status: 200,
				result: await this.movelRepo.find({where:{localizacao:localizacao}})
			};
		}
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        status: 500,
        msg: '',
        det: err
      });
    }
	}

  async criarRegistro( registro: CriarRegistroDto ): Promise<Retorno>
  {
    try
    {
      const reg = this.movelRepo.create({
        descricao:	 registro.descricao,
        marca:			 registro.marca,
        categoria:	 registro.categoria,
        anoAquisicao:registro.anoAquisicao,
        localizacao: registro.localizacao,
        utilizavel:	 registro.utilizavel
      });

      return {
        status: 200,
        result: await this.movelRepo.save( reg )
      };
    }
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        status: 500,
        msg: 'criarRegistro() falhou',
        det: err
      });
		}
	}

	/** Utiliza dto parcial para atualização parcial do registro (datamask).
	 *  @param {EditarRegistroDto} registroParcial - objeto com campos editatum.
	* */
	async editarRegistroDinamicamente( registroParcial: EditarRegistroDto )
  : Promise<any>
	{
    try
    {
      return {
        status: 200,
        result: await this.movelRepo.update( 'id', registroParcial )
      }
    }
    catch(err)
    {
      throw new InternalServerErrorException(
      {
        status: 500,
        msg: 'criarRegistroDinamicamente() falhou',
        det: err
      });
    }
	}
}

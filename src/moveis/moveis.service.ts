import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movel } from './entidades/movel.entidade';
import { CriarRegistroDto } from './dto/criarRegistro.dto';
import { EditarRegistroDto } from './dto/editarRegistro.dto';
import { AuthServiceUsuario } from 'src/auth/auth.service';

@Injectable()
export class MoveisProvedores
{
	constructor(
    @InjectRepository(Movel) private movelRepo: Repository<Movel>,
    private readonly authServiceUsuario: AuthServiceUsuario
  )
	{}

	/** Retorna matriz com todos os registros.
   * @param {string} authToken - token enviado.
   * @returns {Movel[]|string}
	* **/
	async buscarTodos( authToken:string ): Promise<Movel[]|string>
	{
    try
    {
      if ( (await this.authServiceUsuario.autorizacao( authToken )) )
      {
        return this.movelRepo.find();
      }
      else
      {
        throw new Error( 'buscarTodos() operação não autorizada' )
      }
    }
    catch(err)
    {
      throw new Error( err );
    }
	}

  async criarRegistro( registro: CriarRegistroDto, authToken:string ): Promise<Movel>
  {
    try
    {
      if ( (await this.authServiceUsuario.autorizacao( authToken )) )
      {
        const reg = this.movelRepo.create({
          descricao:	 registro.descricao,
          marca:			 registro.marca,
          categoria:	 registro.categoria,
          anoAquisicao:registro.anoAquisicao,
          localizacao: registro.localizacao,
          utilizavel:	 registro.utilizavel
        });

        return await this.movelRepo.save( reg );
      }
      else
      {
        throw new Error( 'criarRegistro() operação não autorizada' );
      }
    }
    catch(err)
    {
      throw new Error( err );
		}
	}

	/** Utiliza dto parcial para atualização parcial do registro (datamask).
	 *  @param {EditarRegistroDto} registroParcial - objeto com campos editatum.
	* */
	async editarRegistroDinamicamente( registroParcial: EditarRegistroDto, authToken:string )
	{
    try
    {
      if ( (await this.authServiceUsuario.autorizacao( authToken )) )
      {
        return await this.movelRepo.update('id', registroParcial );
      }
      else
      {
        throw new Error( 'editarRegistroDinamicamente() não autorizado' );
      }
    }
    catch(err)
    {
      throw new Error( err );
    }
	}
}

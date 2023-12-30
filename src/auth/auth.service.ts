import { Injectable } from '@nestjs/common';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthServiceUsuario
{
  constructor(
    private servicoUsuarios: UsuarioService,
    private jwtService: JwtService
  )
  {}

  /** Acesso ao sistema monousuário.
   *  @param {string} senha - hash da senha gerado no cliente para comparação.
   *  @returns {{acess_token:string}} token para o cliente assinar suas ações nas rotas de funcionalidade. 
  * */
  async validarParaSessao( senha: string ): Promise<{status:number,acess_token:string}>
  {
		try
		{
			if ( await this.servicoUsuarios.usuarioExiste() )
			{
        const senhaArmazenada = await this.servicoUsuarios.obterSenhaPlana();

				if ( senha == senhaArmazenada )
				{
          const payload = this.jwtService.sign(
          {
            sub: await this.servicoUsuarios.getUsername(),
          });

          return {
            status: 200,
            acess_token: payload
          }
				}
				else
				{
					throw new UnauthorizedException(
					{
						statusCode: 401,
						msg: 'hash da senha informada não bate com o do banco de dados'
					});
				}
			}
		}
		catch( err )
		{
			throw new InternalServerErrorException(
			{
				statusCode: 500,
				msg: 'validarParaSessao()',
        err: err
			});
		}
  }
}

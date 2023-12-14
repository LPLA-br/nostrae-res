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
   *  @param {string} hashsenha - hash da senha gerado no cliente para comparação.
   *  @returns {{acess_token:string}} token para o cliente assinar suas ações nas rotas de funcionalidade. 
  * */
  async validarParaSessao( hashsenha: string ): Promise<{acess_token:string}>
  {
		try
		{
			if ( await this.servicoUsuarios.usuarioExiste() )
			{
				const hash = await this.servicoUsuarios.obterHash();

        if ( hash.length == 0 ) throw new Error('{"status":500,"msg":"hash vazio"}');

				if ( hash === hashsenha )
				{
          const payload = this.jwtService.sign(
          {
            sub: await this.servicoUsuarios.getUsername(),
          });

          return {
            acess_token: payload
          }
				}
				else
				{
					throw new UnauthorizedException(
					{
						statusCode: 401,
						msg: 'senha em hash ou login informados não estão corretos'
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

  /* Recebe token do cliente e retorna permissão para ação.
	 *  DESCARTADO DEVIDO CONHECIMENTO DO FUNCIONAMENTO DO JWT
   *  @param {string} token do usuário único.
   *  @returns {boolean} permissão
	 *
  async autorizacao( token:string ): Promise<boolean>
  {
    try
    {
      const userToken = await this.servicoUsuarios.obterToken();
      if ( userToken == token )
      {
        return true;
      }
      return false;
    }
    catch( err )
    {
      throw new UnauthorizedException( err );
    }
  }*/

	/* DESCARTADO DEVIDO A CONHECIMENTO DO FUNCIONAMENTO DO JWT
  async encerrarSessao(): Promise<any>
  {
    try
    {
      await this.servicoUsuarios.deletarToken();
			return '{statusCode:200}';
    }
    catch(err)
    {
      throw new Error( err );
    }
  }
	*/

}

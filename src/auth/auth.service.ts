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

  /** Gera id decimal pseudo aleatório de 32 caracteres.
  *   @returns {string} id decimal de 32 caracteres.*/
  private gerarIdDecimal(): string
  {
    let min = 0;
    let max = 9;
    let id: string = '';
    for (let i = 0; i < 32; i++ )
    {
      let num = Math.floor(Math. random() * (max - min + 1)) + min;
      id = id.concat( num.toString() ) ;
    }
    return id;
  }

  /** Gera token decimal com duração de 6 horas
  *   @returns {{acess_token:string}} objeto com string token*/
  private async gerarJWT(): Promise<{acess_token:string}>
  {
    let payload: string;

    payload = this.jwtService.sign(
    {
      token: this.gerarIdDecimal(),
    });

    return {
      acess_token: payload
    }
  }

  /** Acesso ao sistema monousuário.
   *  @param {string} hashsenha - hash da senha gerado no cliente para comparação.
   *  @returns {{acess_token:string}} token para o cliente assinar suas ações nas rotas de funcionalidade. 
  * */
  async validarParaSessao( hashsenha: string ): Promise<{acess_token:string}>
  {
    if ( this.servicoUsuarios.usuarioExiste() )
    {
      const hash = await this.servicoUsuarios.obterHash();

      if ( hash === hashsenha )
      {
        try
        {
          const token = await this.gerarJWT();
          await this.servicoUsuarios.salvarToken( token.acess_token );
          return token;
        }
        catch( err )
        {
          return {
            acess_token: "500"
          };
        }
      }
      else
      {
        return {
          acess_token: "401"
        };
      }
    }
  }

  /** Recebe token do cliente e retorna permissão para ação.
   *  @param {string} token do usuário único.
   *  @returns {boolean} permissão
  * */
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
      throw new UnauthorizedException({}, err);
    }
  }

  async encerrarSessao(): Promise<any>
  {
    try
    {
      this.servicoUsuarios.deletarToken();
      return '{"status":200}';
    }
    catch(err)
    {
      console.log(err);
      throw new InternalServerErrorException({},`token não removido ${err}`);
    }
  }

}

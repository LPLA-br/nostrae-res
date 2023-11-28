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

  /** Gera id decimal pseudo aleatório de 32 caracteres.*/
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

  /** Gera token decimal com duração de 6 horas */
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
   *  @returns {object} token para o cliente assinar suas ações nas rotas de funcionalidade. 
  * */
  async validarParaSessao( hashsenha: string ): Promise<object>
  {
    if ( this.servicoUsuarios.usuarioExiste() )
    {
      const hash = await this.servicoUsuarios.obterHash();

      if ( hash === hashsenha )
      {
        const token = await this.gerarJWT();
        this.servicoUsuarios.salvarToken( token.acess_token );
        return this.gerarJWT();
      }
      else
      {
        throw new UnauthorizedException({},'não autorizado para sessao');
      }
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

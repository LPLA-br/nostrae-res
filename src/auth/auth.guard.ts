import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConstantes } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate
{

	constructor( private jwtService: JwtService )
	{}

  async canActivate( context: ExecutionContext,): Promise<boolean>
	{
		const request = context.switchToHttp().getRequest();
    const token = this.extrairTokenDoHeader(request);

    if (!token)
		{
      throw new UnauthorizedException(
				{
					statusCode: 401,
					msg: 'sem token. não autorizado'
				}
			);
    }

		try
		{
			const carga = await this.jwtService.verifyAsync( token, { secret: jwtConstantes.secret } );
      request['user'] = carga;
		}
		catch( err )
		{
	      throw new UnauthorizedException(
				{
					statusCode: 401,
					msg: 'informações do usuário não válida. não autorizado'
				});
		}

    return true;
  }

	extrairTokenDoHeader(request: Request): string
	{
		return request.headers.authorization.split('').toString();
	}

}

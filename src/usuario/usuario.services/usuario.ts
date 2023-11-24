import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../entities/usuario.entidade';
import { CreateUserDto } from '../dto/criarUsuario.dto';
import { Autenticar } from '../dto/autenticar.dto';

@Injectable()
export class UsuarioService
{
  constructor(
    @InjectRepository(Usuario) private usuariosRepositorio: Repository<Usuario>,
  )
  {}

  async salvarUsuarioUnico( usuario: CreateUserDto ): Promise<Usuario>
  {
    const verif = this.usuariosRepositorio.find();

    /*responde apenas username para usuário já existente.
    mover para pipe customizado posteriormente.*/
    if( (await verif).length > 0 )
    {
      return verif[0].username;
    }

    //evite passar direto pois a dto muda
    const novoUsuario = this.usuariosRepositorio.create(
    {
      username:   usuario.username,
      hashsenha:  usuario.hashsenha,
      sal:        usuario.sal
    });

    return this.usuariosRepositorio.save( novoUsuario );
  }

  /** Compara hash gerado pelo usuário com o hash
   *  da senha armazendada.
  * */
  async autenticar( auth: Autenticar ): Promise<boolean>
  {
    const consulta = this.usuariosRepositorio.findOne({where:{id:0}});
    if ( (await consulta).hashsenha == auth.hashsenha )
    {
      //gerar e retornar hash.
      return true;
    }
    //string json vazia.
    return false;
  }

}


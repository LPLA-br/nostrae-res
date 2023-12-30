import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  hashsenha: string;

  @Column()
  sal: string;

  //Hashs problemáticos. plaintext.
  @Column()
  senha: string;

}


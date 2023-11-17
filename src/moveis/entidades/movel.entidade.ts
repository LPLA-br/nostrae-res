import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movel
{

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	descricao: string;

	@Column({ nullable: true })
	marca: string;

	@Column({ nullable: false })
	categoria: string;

	@Column({ nullable: false })
	anoAquisicao: number;

	@Column({ nullable: true })
	localizacao: string;

	@Column({ nullable: false })
	utilizavel: boolean

}


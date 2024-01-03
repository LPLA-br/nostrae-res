import { MigrationInterface, QueryRunner } from "typeorm"

export class Dados1704310433675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `
          INSERT INTO movel(descricao,marca,categoria,"anoAquisicao",localizacao) VALUES
          ('Sofá de couro', 'Tok&Stok', 'Movel', 2021, 'Sala1'),
          ('Mesa de jantar', 'Etna', 'Movel', 2020, 'Sala2'),
          ('Cama de casal', 'Ortobom', 'Movel', 2019, 'Quarto1'),
          ('Guarda-roupa', 'MadeiraMadeira', 'Movel', 2018, 'Quarto1'),
          ('Geladeira', 'Brastemp', 'Eletrodomestico', 2017, 'Cozinha1'),
          ('Fogão', 'Electrolux', 'Equipamento', 2016, 'Cozinha1'),
          ('Poltrona', 'Mobly', 'Movel', 2021, 'Sala2'),
          ('Rack', 'Casas Bahia', 'Movel', 2020, 'Sala2'),
          ('TV', 'Samsung', 'Eletrodomestico', 2019, 'Sala3'),
          ('Ar-condicionado', 'LG', 'Eletrodomestico', 2018, 'Quarto4'),
          ('Ventilador', 'Arno', 'Eletrodomestico', 2017, 'Quarto4'),
          ('Micro-ondas', 'Panasonic', 'Eletrodomestico', 2016, 'Cozinha1'),
          ('Liquidificador', 'Philips', 'Eletrodomestico', 2015, 'Cozinha1'),
          ('Cadeira', 'Tramontina', 'Movel', 2021, 'Sala2'),
          ('Banco', 'Oppa', 'Movel', 2020, 'Sala1'),
          ('Colchão', 'Castor', 'Movel', 2019, 'Quarto4'),
          ('Cômoda', 'Móveis Província', 'Movel', 2018, 'Quarto1'),
          ('Forno', 'Fischer', 'Equipamento', 2017, 'Cozinha2'),
          ('Torradeira', 'Oster', 'Eletrodomestico', 2016, 'Cozinha2'),
          ('Cortina', 'Corttex', 'Texil', 2015, 'Sala1');
        `
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      'DELETE FROM movel;'
    }

}

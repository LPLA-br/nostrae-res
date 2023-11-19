import { Test, TestingModule } from '@nestjs/testing';
import { MoveisControladoresController } from './moveis.controladores.controller';

describe('MoveisControladoresController', () => {
  let controller: MoveisControladoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoveisControladoresController],
    }).compile();

    controller = module.get<MoveisControladoresController>(MoveisControladoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

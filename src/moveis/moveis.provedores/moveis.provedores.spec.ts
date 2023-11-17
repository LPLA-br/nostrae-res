import { Test, TestingModule } from '@nestjs/testing';
import { MoveisProvedores } from './moveis.provedores';

describe('MoveisProvedores', () => {
  let provider: MoveisProvedores;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoveisProvedores],
    }).compile();

    provider = module.get<MoveisProvedores>(MoveisProvedores);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

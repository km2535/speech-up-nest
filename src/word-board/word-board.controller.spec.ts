import { Test, TestingModule } from '@nestjs/testing';
import { WordBoardController } from './word-board.controller';

describe('WordBoardController', () => {
  let controller: WordBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordBoardController],
    }).compile();

    controller = module.get<WordBoardController>(WordBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

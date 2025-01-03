import { Test, TestingModule } from '@nestjs/testing';
import { WordBoardService } from './word-board.service';

describe('WordBoardService', () => {
  let service: WordBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordBoardService],
    }).compile();

    service = module.get<WordBoardService>(WordBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

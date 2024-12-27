import { Test, TestingModule } from '@nestjs/testing';
import { SpeechScriptService } from './speech-script.service';

describe('SpeechScriptService', () => {
  let service: SpeechScriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeechScriptService],
    }).compile();

    service = module.get<SpeechScriptService>(SpeechScriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

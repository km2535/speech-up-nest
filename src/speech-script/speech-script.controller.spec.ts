import { Test, TestingModule } from '@nestjs/testing';
import { SpeechScriptController } from './speech-script.controller';

describe('SpeechScriptController', () => {
  let controller: SpeechScriptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeechScriptController],
    }).compile();

    controller = module.get<SpeechScriptController>(SpeechScriptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

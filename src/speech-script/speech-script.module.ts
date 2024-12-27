import { Module } from '@nestjs/common';
import { SpeechScriptService } from './speech-script.service';
import { SpeechScriptController } from './speech-script.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeechScriptEntity } from '../domain/speech-script.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeechScriptEntity])],
  controllers: [SpeechScriptController],
  providers: [SpeechScriptService],
})
export class SpeechScriptModule {}

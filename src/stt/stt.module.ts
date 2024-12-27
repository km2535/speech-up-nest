import { Module } from '@nestjs/common';
import { SttService } from './stt.service';
import { SttController } from './stt.controller';
import { HttpModule } from '@nestjs/axios';
import { SttEntity } from '../domain/stt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeechScriptEntity } from '../domain/speech-script.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([SttEntity, SpeechScriptEntity]),
  ],
  controllers: [SttController],
  providers: [SttService],
})
export class SttModule {}

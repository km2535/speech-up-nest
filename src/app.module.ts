import { Module } from '@nestjs/common';
import { SpeechScriptModule } from './speech-script/speech-script.module';
import { DatabaseModule } from './database/database.module';
import { SttModule } from './stt/stt.module';
import { ConfigModule } from '@nestjs/config';
import { RecordModule } from './record/record.module';
import { WordBoardModule } from './word-board/word-board.module';
import { RedisWordModule } from './database/redis-word.module';

@Module({
  imports: [
    SpeechScriptModule,
    DatabaseModule,
    RedisWordModule,
    RecordModule,
    WordBoardModule,
    SttModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

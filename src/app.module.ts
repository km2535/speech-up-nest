import { Module } from '@nestjs/common';
import { SttModule } from './stt/stt.module';
import { ConfigModule } from '@nestjs/config';
import { WordBoardModule } from './word-board/word-board.module';
import { RedisWordModule } from './database/redis-word.module';

@Module({
  imports: [
    RedisWordModule,
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

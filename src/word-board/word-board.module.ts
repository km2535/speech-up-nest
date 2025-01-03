import { Module } from '@nestjs/common';
import { WordBoardController } from './word-board.controller';
import { WordBoardService } from './word-board.service';
import { RedisWordModule } from '../database/redis-word.module';

@Module({
  imports: [RedisWordModule],
  controllers: [WordBoardController],
  providers: [WordBoardService],
})
export class WordBoardModule {}

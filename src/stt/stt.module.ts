import { Module } from '@nestjs/common';
import { SttService } from './stt.service';
import { SttController } from './stt.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SttController],
  providers: [SttService],
})
export class SttModule {}

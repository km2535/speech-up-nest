import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommonResponse } from '../response/common-response';
import { RedisCreateRequest } from './dto/redis-create-request';
import { WordBoardService } from './word-board.service';

@Controller('word-board')
export class WordBoardController {
  constructor(private readonly wordBoardService: WordBoardService) {}

  @Post()
  @ApiOperation({
    summary: 'word 를 레디스 캐시에 저장',
    description: 'word를 레디스 캐시에 저장합니다.',
  })
  async wordSave(
    @Body() createRequest: RedisCreateRequest,
  ): Promise<CommonResponse<void>> {
    return CommonResponse.success(
      await this.wordBoardService.saveRedis(createRequest),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'word 를 가져옵니다.',
    description: 'word를 배열 타입으로 가져옵니다.',
  })
  async wordFind(): Promise<CommonResponse<string[]>> {
    return CommonResponse.success(await this.wordBoardService.getRedisData());
  }
}

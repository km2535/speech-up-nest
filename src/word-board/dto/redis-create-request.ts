import { IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedisCreateRequest {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ example: '["안녕하세요", "와우"]' })
  redisContent: Array<string>;

  constructor(redisContent: Array<string>) {
    this.redisContent = redisContent;
  }
}

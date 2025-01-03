import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisCreateRequest } from './dto/redis-create-request';
import * as process from 'node:process';

@Injectable()
export class WordBoardService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async saveRedis(createRequest: RedisCreateRequest) {
    this.redisClient.set(
      process.env.REDIS_KEY,
      createRequest.redisContent.toString(),
    );
  }

  async getRedisData() {
    const data = await this.redisClient.get(process.env.REDIS_KEY);
    if (data) {
      return data.split(',');
    }
    return [];
  }
}

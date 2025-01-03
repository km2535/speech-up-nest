import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import * as process from 'node:process';

@Global() // 애플리케이션 전역에서 사용할 수 있도록 설정
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: 6379,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'], // 다른 모듈에서 사용할 수 있도록 exports 설정
})
export class RedisWordModule {}

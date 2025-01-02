import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Speech API')
    .setDescription('The speech up API description')
    .setVersion('1.0')
    .addTag('speech')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // CORS 설정
  app.enableCors({
    origin: process.env.CORS_DOMAIN, // 허용할 도메인 (프론트엔드 주소)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    allowedHeaders: 'Content-Type, Authorization', // 허용할 헤더
    credentials: true, // 쿠키 전송 허용
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

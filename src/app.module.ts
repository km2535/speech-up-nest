import { Module } from '@nestjs/common';
import { SpeechScriptModule } from './speech-script/speech-script.module';
import { DatabaseModule } from './database/database.module';
import { SttModule } from './stt/stt.module';
import { ConfigModule } from '@nestjs/config';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    SpeechScriptModule,
    DatabaseModule,
    SttModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecordModule,
  ],
})
export class AppModule {}

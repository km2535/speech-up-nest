import { IsBoolean, IsInt, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SpeechScriptEntity } from '../../domain/speech-script.entity';
import { BaseEntity } from '../../domain/base.entity';
import { SttEntity } from '../../domain/stt.entity';

export class SttGetResponse extends BaseEntity {
  @IsInt()
  scriptId: number;

  @IsInt()
  sttId: number;

  @IsString()
  title: string;

  @IsString()
  sttContent: string;

  @IsBoolean()
  isUse: boolean;

  constructor(
    scriptId: number,
    title: string,
    sttContent: string,
    isUse: boolean,
  ) {
    super();
    this.scriptId = scriptId;
    this.title = title;
    this.sttContent = sttContent;
    this.isUse = isUse;
  }
  static of(SttEntity: SttEntity): SttGetResponse {
    return plainToClass(SttGetResponse, SttEntity);
  }
}

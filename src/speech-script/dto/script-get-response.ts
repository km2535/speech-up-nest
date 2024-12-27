// script-get-response.dto.ts
import { IsBoolean, IsInt, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SpeechScriptEntity } from '../../domain/speech-script.entity';
import { BaseEntity } from '../../domain/base.entity';

export class ScriptGetResponse extends BaseEntity {
  @IsInt()
  scriptId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  isUse: boolean;

  constructor(
    scriptId: number,
    title: string,
    content: string,
    isUse: boolean,
  ) {
    super();
    this.scriptId = scriptId;
    this.title = title;
    this.content = content;
    this.isUse = isUse;
  }

  static of(speechScriptEntity: SpeechScriptEntity): ScriptGetResponse {
    return plainToClass(ScriptGetResponse, speechScriptEntity);
  }
}

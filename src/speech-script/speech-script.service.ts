import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeechScriptEntity } from '../domain/speech-script.entity';
import { Repository } from 'typeorm';
import { ScriptGetResponse } from './dto/script-get-response';
import { SpeechScriptCreateRequest } from './dto/script-create-request';
import { SpeechScriptUpdateRequest } from './dto/script-update-request';

@Injectable()
export class SpeechScriptService {
  constructor(
    @InjectRepository(SpeechScriptEntity)
    private speechScriptRepository: Repository<SpeechScriptEntity>,
  ) {}

  async getScriptListByUserId(): Promise<ScriptGetResponse[]> {
    const scripts = await this.speechScriptRepository.find();
    return scripts.map((script) => ScriptGetResponse.of(script));
  }

  async createScript(
    createRequest: SpeechScriptCreateRequest,
  ): Promise<ScriptGetResponse> {
    const scriptEntity = new SpeechScriptEntity();
    scriptEntity.title = createRequest.title;
    scriptEntity.content = createRequest.content;

    scriptEntity.createdAt = new Date();
    scriptEntity.modifiedAt = new Date();
    scriptEntity.isUse = true; // 기본적으로 활성화된 상태로 설정

    // 데이터베이스에 저장
    const savedScript = await this.speechScriptRepository.save(scriptEntity);

    // 저장된 엔티티를 ScriptGetResponse로 변환하여 반환
    return ScriptGetResponse.of(savedScript);
  }

  async updateScript(
    updateRequest: SpeechScriptUpdateRequest,
  ): Promise<ScriptGetResponse> {
    const scriptEntity = new SpeechScriptEntity();
    const scriptId = updateRequest.scriptId;
    scriptEntity.title = updateRequest.title;
    scriptEntity.content = updateRequest.content;
    scriptEntity.modifiedAt = new Date();
    await this.speechScriptRepository.update(scriptId, scriptEntity);
    return ScriptGetResponse.of(scriptEntity);
  }

  async deleteScript(scriptId: number): Promise<ScriptGetResponse> {
    const scriptEntity = new SpeechScriptEntity();
    scriptEntity.isUse = false;
    await this.speechScriptRepository.update(scriptId, scriptEntity);
    return ScriptGetResponse.of(scriptEntity);
  }
}

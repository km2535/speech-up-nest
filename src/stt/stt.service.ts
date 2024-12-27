import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { SttCreateRequest } from './dto/stt-create-request';
import { SttEntity } from '../domain/stt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeechScriptEntity } from '../domain/speech-script.entity';
import { Repository } from 'typeorm';
import { SttGetResponse } from './dto/stt-get-response';

@Injectable()
export class SttService {
  private readonly openai: OpenAI;

  constructor(
    @InjectRepository(SpeechScriptEntity)
    private speechScriptRepository: Repository<SpeechScriptEntity>,
    @InjectRepository(SttEntity)
    private sttRepository: Repository<SttEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // OpenAI API 키 설정
    });
  }

  // 클라이언트로부터 받은 음성 파일을 텍스트로 변환
  async transcribeAudio(fileBuffer: Buffer): Promise<string> {
    try {
      // 'uploads' 디렉토리가 존재하는지 확인하고, 없으면 생성
      const uploadsDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir); // 디렉터리 생성
      }

      // 임시 파일 경로 생성
      const filePath = path.join(uploadsDir, 'audio.mp3');
      fs.writeFileSync(filePath, fileBuffer);

      // Whisper API에 음성 파일 전송
      return await this.transcribeWithWhisper(filePath); // 변환된 텍스트 반환
    } catch (error) {
      console.error('음성 인식 실패:', error);
      throw new HttpException(
        '음성 인식에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Whisper API에 음성 파일을 전송하여 텍스트로 변환
  private async transcribeWithWhisper(filePath: string): Promise<any> {
    try {
      // OpenAI Whisper 모델을 사용하여 음성 파일을 텍스트로 변환
      return await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: 'whisper-1',
        response_format: 'text', // 텍스트 형식으로 응답 받기
      }); // Whisper 응답 반환
    } catch (error) {
      console.error('Whisper API 요청 실패:', error);
      throw new HttpException(
        'Whisper API 요청 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createStt(createRequest: SttCreateRequest): Promise<SttGetResponse> {
    const sttEntity = new SttEntity();
    sttEntity.sttContent = createRequest.sttContent;
    // 스크립트 조회
    const speechScript: SpeechScriptEntity =
      await this.speechScriptRepository.findOne({
        where: {
          scriptId: createRequest.scriptId,
        },
      });
    // 조회된 스크립트의 컨텐츠를 저장
    sttEntity.scriptContent = speechScript.content;
    sttEntity.createdAt = new Date();
    sttEntity.modifiedAt = new Date();
    sttEntity.isUse = true;
    console.log(sttEntity);
    const result = await this.sttRepository.save(sttEntity);
    return SttGetResponse.of(result);
  }
}

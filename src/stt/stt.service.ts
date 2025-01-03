import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';

@Injectable()
export class SttService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // OpenAI API 키 설정
    });
  }

  // 클라이언트로부터 받은 음성 파일을 텍스트로 변환
  async transcribeAudio(fileBuffer: Buffer, language: string): Promise<string> {
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
      return await this.transcribeWithWhisper(filePath, language); // 변환된 텍스트 반환
    } catch (error) {
      console.error('음성 인식 실패:', error);
      throw new HttpException(
        '음성 인식에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Whisper API에 음성 파일을 전송하여 텍스트로 변환
  private async transcribeWithWhisper(
    filePath: string,
    language: string,
  ): Promise<any> {
    try {
      // OpenAI Whisper 모델을 사용하여 음성 파일을 텍스트로 변환
      return await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: 'whisper-1',
        response_format: 'text', // 텍스트 형식으로 응답 받기
        language: language,
      }); // Whisper 응답 반환
    } catch (error) {
      console.error('Whisper API 요청 실패:', error);
      throw new HttpException(
        'Whisper API 요청 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

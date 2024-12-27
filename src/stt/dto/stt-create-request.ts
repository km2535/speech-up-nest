import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SttCreateRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Stt를 통한 결과입니다.' })
  sttContent: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: '해당 스크립트의 아이디 입니다.' })
  scriptId: number;

  constructor(sttContent: string, scriptId: number) {
    this.sttContent = sttContent;
    this.scriptId = scriptId;
  }
}

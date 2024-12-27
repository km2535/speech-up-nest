import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpeechScriptUpdateRequest {
  @ApiProperty({ example: 1 })
  scriptId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '수정된 제목' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '수정된 내용' })
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

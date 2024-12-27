import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpeechScriptCreateRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '제목입니다.' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '내용입니다.' })
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

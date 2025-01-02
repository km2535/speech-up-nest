import { ApiProperty } from '@nestjs/swagger';
import { RecordEntity } from '../../domain/record.entity';
import { plainToClass } from 'class-transformer';

export class RecordGetResponse {
  @ApiProperty({
    description: '레코드 ID',
    example: 1,
  })
  recordId: number;

  @ApiProperty({
    description: '스크립트 ID',
    example: 101,
  })
  scriptId: number;

  @ApiProperty({
    description: '오디오 분석 여부',
    example: true,
  })
  isAnalyzed: boolean;

  @ApiProperty({
    description: '오디오 파일 (Base64 인코딩된 데이터)',
    example: 'UklGRiIAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=',
  })
  audio: string;

  static of(recordEntity: RecordEntity): RecordGetResponse {
    return plainToClass(RecordGetResponse, recordEntity);
  }
}

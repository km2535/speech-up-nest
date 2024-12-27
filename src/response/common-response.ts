import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CommonResponse<T> {
  @IsEnum(['SUCCESS', 'FAIL'])
  result: Result;

  @IsOptional()
  data?: T;

  @ApiProperty({
    description: 'Error code',
    required: false,
  })
  @ApiProperty({
    description: 'Error message for client',
    required: false,
  })
  @IsOptional()
  @IsString()
  errorMessageForClient?: string;

  @ApiProperty({
    description: 'Error message for logs',
    required: false,
  })
  @IsOptional()
  @IsString()
  errorMessageForLog?: string;

  constructor(
    result: string,
    data?: T,
    errorMessageForClient?: string,
    errorMessageForLog?: string,
  ) {
    this.result = <Result>result;
    this.data = data;
    this.errorMessageForClient = errorMessageForClient;
    this.errorMessageForLog = errorMessageForLog;
  }

  static success<T>(data: T): CommonResponse<T> {
    return new CommonResponse<T>('SUCCESS', data);
  }
}

export enum Result {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

import { IsDateString } from 'class-validator';

export class TimestampDTO {
  @IsDateString()
  createdAt: string;

  @IsDateString()
  modifiedAt: string;

  constructor(createdAt: string, modifiedAt: string) {
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }
}

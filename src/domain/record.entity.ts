import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsInt } from 'class-validator';
import { BaseEntity } from './base.entity';

@Entity('record')
export class RecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  recordId: number;

  @Column({ type: 'longblob' })
  audio: Buffer;

  @IsInt()
  @Column({ name: 'scriptId' })
  scriptId: number;

  @IsBoolean()
  isAnalyzed: boolean;
}

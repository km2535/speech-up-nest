import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean } from 'class-validator';
import { BaseEntity } from './base.entity';

@Entity('record')
export class RecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  recordId: number;

  @Column({ type: 'longblob' })
  audio: Buffer;

  @Column()
  scriptId: number;

  @IsBoolean()
  isAnalyzed: boolean;
}

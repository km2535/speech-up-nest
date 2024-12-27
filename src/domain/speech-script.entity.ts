import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('script')
export class SpeechScriptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  scriptId: number;

  @Column({ type: 'boolean', default: true })
  isUse: boolean;

  // @Column({ type: 'bigint' })
  // userId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  content: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string | null;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('stt')
export class SttEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  sttId: number;

  @Column({ type: 'boolean', default: true })
  isUse: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sttContent: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  scriptContent: string | null;
}

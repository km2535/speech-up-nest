import { Column } from 'typeorm';

export class BaseEntity {
  @Column({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  modifiedAt: Date | null;
}

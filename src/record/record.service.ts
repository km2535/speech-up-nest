import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordEntity } from '../domain/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
  ) {}

  async createRecord(file: Express.Multer.File, scriptId: number) {
    const record = this.recordRepository.create({
      audio: file.buffer,
      scriptId: scriptId,
      isAnalyzed: false,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    return this.recordRepository.save(record);
  }
}

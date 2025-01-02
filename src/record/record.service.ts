import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordEntity } from '../domain/record.entity';
import { RecordGetResponse } from './dto/record-get-response';

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

  async findRecord(scriptId: number): Promise<RecordGetResponse[]> {
    const entities = await this.recordRepository.findBy({ scriptId });
    return entities.map((entity) => RecordGetResponse.of(entity));
  }
}

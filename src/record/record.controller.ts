import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('/:scriptId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '녹음 파일 업로드',
    description: '녹음 파일을 업로드 합니다.',
  })
  @ApiParam({
    name: 'scriptId',
    type: Number,
    description: '스크립트 ID',
    example: 1,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '업로드할 음성 파일',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '업로드할 음성 파일 (.wav, .mp3 등)',
        },
      },
    },
  })
  async addRecord(
    @UploadedFile() file: Express.Multer.File,
    @Param() scriptId: number,
  ) {
    await this.recordService.createRecord(file, scriptId);
  }
}

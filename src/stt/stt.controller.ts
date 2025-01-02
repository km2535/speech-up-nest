import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SttService } from './stt.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonResponse } from '../response/common-response';
import { SttCreateRequest } from './dto/stt-create-request';
import { SttGetResponse } from './dto/stt-get-response';

@ApiTags('STT')
@Controller('stt')
export class SttController {
  constructor(private readonly sttService: SttService) {}

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '음성 파일 업로드 및 텍스트 변환',
    description: '음성 파일을 업로드하고 해당 음성을 텍스트로 변환합니다.',
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
  async handleFileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body('lang') lang: string,
  ): Promise<CommonResponse<string>> {
    if (!file) {
      throw new Error('파일이 업로드되지 않았습니다.');
    }
    const response = await this.sttService.transcribeAudio(file.buffer, lang);
    return CommonResponse.success(response);
  }

  @Post()
  @ApiOperation({
    summary: 'STT 결과를 DB에 저장',
    description: 'STT 결과를 스크립트와 함께 DB에 저장',
  })
  async sttSave(
    @Body() createRequest: SttCreateRequest,
  ): Promise<CommonResponse<SttGetResponse>> {
    return CommonResponse.success(
      await this.sttService.createStt(createRequest),
    );
  }
}

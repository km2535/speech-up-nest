import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SpeechScriptService } from './speech-script.service';
import { ScriptGetResponse } from './dto/script-get-response';
import { SpeechScriptCreateRequest } from './dto/script-create-request';
import { SpeechScriptUpdateRequest } from './dto/script-update-request';
import { CommonResponse } from '../response/common-response';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('SpeechScript')
@Controller('speech-script')
export class SpeechScriptController {
  constructor(private readonly scriptService: SpeechScriptService) {}

  @Get('/users/me')
  async getScriptAll(): Promise<CommonResponse<ScriptGetResponse[]>> {
    const response = await this.scriptService.getScriptListByUserId();
    return CommonResponse.success(response);
  }

  @Post()
  @ApiOperation({
    description: '스크립트를 작성합니다.',
  })
  @ApiResponse({
    example: {
      result: 'SUCCESS',
      data: {
        scriptId: 7,
        title: '제목입니다.',
        content: '내용입니다.',
        isUse: true,
        createdAt: '2024-12-27T02:47:07.711Z',
        modifiedAt: '2024-12-27T02:47:07.711Z',
      },
    },
  })
  async createScript(
    @Body() createRequest: SpeechScriptCreateRequest,
  ): Promise<CommonResponse<ScriptGetResponse>> {
    return CommonResponse.success(
      await this.scriptService.createScript(createRequest),
    );
  }

  @Patch()
  @ApiResponse({
    example: {
      result: 'SUCCESS',
      data: {
        title: '수정된 제목',
        content: '수정된 내용',
        modifiedAt: '2024-12-27T02:48:55.517Z',
      },
    },
  })
  async updateScript(
    @Body() updateRequest: SpeechScriptUpdateRequest,
  ): Promise<CommonResponse<ScriptGetResponse>> {
    return CommonResponse.success(
      await this.scriptService.updateScript(updateRequest),
    );
  }

  @Delete('/:scriptId')
  @ApiParam({
    name: 'scriptId',
    description: '스크립트의 아이디를 작성해주세요',
    type: Number,
    example: 1, // 예시 scriptId
  })
  @ApiResponse({
    example: {
      result: 'SUCCESS',
      data: {
        isUse: false,
      },
    },
  })
  async deleteScript(
    @Param() scriptId: number,
  ): Promise<CommonResponse<ScriptGetResponse>> {
    return CommonResponse.success(
      await this.scriptService.deleteScript(scriptId),
    );
  }
}

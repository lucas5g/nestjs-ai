import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { DownloadAppDto, Transcribe, TranscribeAppDto } from '@/dto/app.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiResponse,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/download')
  @ApiExcludeEndpoint()
  async download(@Body() downloadAppDto: DownloadAppDto, @Res() res: Response) {
    const filePath = await this.appService.download(downloadAppDto);

    res.download(filePath);
  }

  @Post('/transcribe')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    // description: 'List of cats',
    type: TranscribeAppDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transcrição do aúdio/vídeo',
    type: Transcribe,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
    }),
  )
  transcribe(@UploadedFile() file: Express.Multer.File) {
    return this.appService.transcribe(file);
  }
}

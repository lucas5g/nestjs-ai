import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { DownloadAppDto } from '@/dto/app.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home() {
    return { api: 'Api estudos AI' };
  }

  @Post('/download')
  async download(@Body() downloadAppDto: DownloadAppDto, @Res() res: Response) {
    const filePath = await this.appService.download(downloadAppDto);

    res.download(filePath);
  }

  @Post('/transcribe')
  @UseInterceptors(FileInterceptor('file'))
  transcribe(@UploadedFile() file: Express.Multer.File) {
    return this.appService.transcribe(file);
  }
}

import Groq from 'groq-sdk';
import * as youtubeDl from 'youtube-dl-exec';

import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { env } from '@/utils/env';
import { DownloadAppDto } from '@/dto/app.dto';
@Injectable()
export class AppService {
  async transcribe(file: Express.Multer.File) {
    if (!file) {
      return new BadRequestException('Arquivo não entregue');
    }
    const groq = new Groq({
      apiKey: env.GROQ_API_KEY,
    });

    const filePath = `uploads/${file.originalname}`;

    fs.writeFileSync(filePath, file.buffer);

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-large-v3',
      // response_format: 'verbose_json',
    });

    return transcription;
  }

  async download({ url }: DownloadAppDto) {
    const pathFile = `uploads/${url.split('=')[1]}.mp4`;
    await youtubeDl.exec(url, {
      format: 'best',
      output: pathFile,
    });

    return pathFile;
  }
}

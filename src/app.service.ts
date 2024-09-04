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
      throw new BadRequestException('Arquivo file é obrigatório.');
    }
    const groq = new Groq({
      apiKey: env.GROQ_API_KEY,
    });

    const filePath = `${file.path}.${file.originalname.split('.').at(-1)}`;
    fs.renameSync(file.path, filePath);

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-large-v3',
    });

    fs.rmSync(filePath);
    return transcription;
  }

  async download({ url }: DownloadAppDto) {
    const pathFile = `./uploads/${url.split('=')[1]}.mp4`;
    try {
      await youtubeDl.exec(url, {
        format: 'best',
        output: pathFile,
        verbose: true,
      });

      return pathFile;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Não foi possível relaizar o download');
    }
  }
}

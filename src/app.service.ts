import Groq from 'groq-sdk';
import * as youtubeDl from 'youtube-dl-exec';

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { env } from '@/utils/env';
@Injectable()
export class AppService {
  async transcribe() {
    const groq = new Groq({
      apiKey: env.GROQ_API_KEY,
    });
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(`${__dirname}/test.mp4`),
      model: 'whisper-large-v3',
      response_format: 'verbose_json',
    });

    return transcription;
  }

  download(url: string) {
    return youtubeDl.exec(url, {
      format: 'best',
      output: `${__dirname}/uploads/${url.split('=')[1]}.mp4`,
    });
  }
}

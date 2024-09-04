import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DownloadAppDto {
  @ApiProperty()
  @IsNotEmpty()
  url: string;
}

export class TranscribeAppDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: any;
}

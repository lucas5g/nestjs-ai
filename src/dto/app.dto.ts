import { IsNotEmpty } from 'class-validator';

export class DownloadAppDto {
  @IsNotEmpty()
  url: string;
}

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [VideoModule],
})
export class AppModule {}

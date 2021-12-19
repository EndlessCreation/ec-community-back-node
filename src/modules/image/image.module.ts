import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from './image.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: 'public',
    }),
  ],
  controllers: [ImageController],
})
export class ImageModule {}

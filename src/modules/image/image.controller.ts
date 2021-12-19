import { Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/common/library/multer-option';
import { ApiFile } from 'src/decorators/file.decoratoers';
import { ImageResponse } from './dto/image-response.dto';

@Controller('images')
@ApiTags('Images')
export class ImageController {
  @Post('upload')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '이미지 추가',
    type: ImageResponse,
  })
  @ApiFile({ name: 'image' })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File): ImageResponse {
    return new ImageResponse(file.path);
  }
}

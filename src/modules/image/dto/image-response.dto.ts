import { ApiProperty } from '@nestjs/swagger';

export class ImageResponse {
  @ApiProperty()
  image: string;

  constructor(image: string) {
    this.image = image;
  }
}

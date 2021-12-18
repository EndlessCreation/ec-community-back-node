import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  year?: number;

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  image?: string;

  constructor(user: User) {
    this.id = user.id;
    this.year = user.year;
    this.name = user.name;
    this.email = user.email;
    this.isActive = user.isActive;
    this.image = user.image;
  }
}

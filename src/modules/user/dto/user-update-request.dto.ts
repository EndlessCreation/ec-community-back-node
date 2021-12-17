import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UserUpdateRequest {
  @ApiPropertyOptional()
  @IsNumber()
  year?: number;

  @ApiProperty()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsString()
  image?: string;
}

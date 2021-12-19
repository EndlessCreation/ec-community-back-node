import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortType } from 'src/constants/sort-type';
import { UserSortType } from 'src/constants/user-sort-type';

export class UserListRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  skill?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  size: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(UserSortType)
  orderBy?: UserSortType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;
}

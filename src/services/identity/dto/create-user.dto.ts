import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Arwa', description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiPropertyOptional({ example: 'Arwa' })
  @IsOptional()
  @IsString()
  displayName?: string;
}

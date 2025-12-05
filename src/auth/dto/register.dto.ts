import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ minLength: 3, maxLength: 32 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  username!: string;

  @ApiProperty({ minLength: 6, maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  password!: string;
}

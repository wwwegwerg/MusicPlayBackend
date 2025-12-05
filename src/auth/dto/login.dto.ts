import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ maxLength: 32 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  username!: string;

  @ApiProperty({ maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  password!: string;
}

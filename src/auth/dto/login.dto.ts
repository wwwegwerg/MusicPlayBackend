import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  password!: string;
}

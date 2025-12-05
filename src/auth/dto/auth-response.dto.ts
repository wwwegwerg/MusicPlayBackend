import { ApiProperty } from '@nestjs/swagger';
import { PublicUserDto } from '../../users/dto/public-user.dto';

export class AuthResponseDto {
  @ApiProperty({ type: () => PublicUserDto })
  user!: PublicUserDto;

  @ApiProperty({ description: 'JWT access token. Pass as Bearer token to access protected routes.' })
  token!: string;
}

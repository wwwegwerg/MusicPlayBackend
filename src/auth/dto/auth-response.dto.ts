import { ApiProperty } from '@nestjs/swagger';
import { PublicUserDto } from '../../users/dto/public-user.dto';

export class AuthResponseDto {
  @ApiProperty({ type: () => PublicUserDto })
  user!: PublicUserDto;

  @ApiProperty({ description: 'JWT-токен доступа. Передавайте как Bearer-токен для доступа к защищённым маршрутам.' })
  token!: string;
}

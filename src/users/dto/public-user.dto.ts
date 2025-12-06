import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty({ format: 'uuid', description: 'Уникальный идентификатор пользователя' })
  id!: string;

  @ApiProperty({ maxLength: 32, description: 'Уникальное имя, выбранное при регистрации' })
  username!: string;

  @ApiProperty({ type: String, format: 'date-time', description: 'Метка времени ISO, когда пользователь был создан' })
  createdAt!: string;

  @ApiProperty({ type: String, format: 'date-time', description: 'Метка времени ISO последнего обновления' })
  updatedAt!: string;
}

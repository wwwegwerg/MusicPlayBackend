import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty({ format: 'uuid', description: 'Unique identifier of the user' })
  id!: string;

  @ApiProperty({ maxLength: 32, description: 'Unique username chosen during registration' })
  username!: string;

  @ApiProperty({ type: String, format: 'date-time', description: 'ISO timestamp when the user was created' })
  createdAt!: string;

  @ApiProperty({ type: String, format: 'date-time', description: 'ISO timestamp of the last update' })
  updatedAt!: string;
}

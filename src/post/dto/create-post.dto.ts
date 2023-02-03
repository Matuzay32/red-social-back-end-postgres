import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  media: string;

  @ApiProperty()
  updatedAt: Date;
}

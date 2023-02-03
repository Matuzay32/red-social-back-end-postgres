import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  media: string;

  @ApiProperty()
  updatedAt: Date;
}

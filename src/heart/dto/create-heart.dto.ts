import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreateHeartDto {
  @ApiProperty()
  @IsBoolean()
  liked: boolean;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  created_at: Date;
}

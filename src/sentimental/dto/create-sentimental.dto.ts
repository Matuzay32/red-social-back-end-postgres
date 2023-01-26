import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSentimentalDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

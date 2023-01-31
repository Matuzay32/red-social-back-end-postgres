import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}

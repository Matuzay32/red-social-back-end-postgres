import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateGenderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}

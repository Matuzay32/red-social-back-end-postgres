import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTypeAcountDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
export class CreateProfileDto {
  @ApiProperty()
  country_id: number;

  @ApiProperty()
  gender_id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  sentimental_id: number;

  @ApiProperty()
  TypeAcount_id: number;
}

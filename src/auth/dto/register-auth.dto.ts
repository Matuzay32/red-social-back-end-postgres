import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(4)
  @ApiProperty()
  username: string;

  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  gender_id: number;

  @ApiProperty()
  sentimental_id: number;

  @ApiProperty()
  typeAcount_id: number;

  @ApiProperty()
  birthday: Date;
}

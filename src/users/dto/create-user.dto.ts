import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: String;
  @ApiProperty()
  @IsNotEmpty()
  password: String;
  @ApiProperty()
  @IsEmail()
  email: String;
}

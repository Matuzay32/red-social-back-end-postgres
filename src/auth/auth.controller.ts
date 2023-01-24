import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { CreateUserInterface } from '../users/interface/create.user.interface';
import LoginResponse from './auth.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userObject: RegisterAuthDto): Promise<CreateUserInterface> {
    return this.authService.createUser(userObject);
  }

  @Post('login')
  login(@Body() userObject: LoginAuthDto): Promise<LoginResponse> {
    return this.authService.login(userObject);
  }
}

import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcryptjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtServie: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(userObject: RegisterAuthDto) {
    const { password, email } = userObject;
    const plainPass = await hash(password, 10);
    const usuarioEncriptado = { ...userObject, password: plainPass };

    const findUser = await this.usersRepository.findBy({ email: email });
    if (!findUser) {
      await this.usersRepository.create(usuarioEncriptado);
      throw new HttpException(
        {
          status: HttpStatus.OK,
          message: 'Usuario creado exitosamente',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'El usuario ya existe',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  // async login(userObject: LoginAuthDto) {
  //   const { email, password } = userObject;
  //   const findUser = await this.usersRepository.findBy({ email: email });

  //   if (!findUser) {
  //     throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
  //   }
  //   const checkPass = await compare(password, findUser.password);

  //   if (!checkPass) {
  //     throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);
  //   }

  //   const payload = {
  //     id: findUser.id,
  //     username: findUser.username,
  //     email: findUser.email,
  //   };

  //   const token = await this.jwtServie.sign(payload);

  //   const data = {
  //     token,
  //   };

  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: data,
  //   };
  // }
}

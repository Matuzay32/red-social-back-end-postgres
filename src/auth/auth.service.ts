import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcryptjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserInterface } from '../users/interface/create.user.interface';
import LoginResponse from '../auth/auth.interface';
import { Profile } from 'src/profile/entities/profile.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private repositryProfile: Repository<Profile>,
    private jwtServie: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(userObject: RegisterAuthDto): Promise<CreateUserInterface> {
    const {
      password,
      email,
      country_id,
      gender_id,
      sentimental_id,
      typeAcount_id,
    } = userObject;
    const plainPass = await hash(password, 10);

    const usuarioEncriptado = { ...userObject, password: plainPass };

    const findUser = await this.usersRepository.findOneBy({ email });

    if (!findUser) {
      const user = await this.usersRepository.save(usuarioEncriptado);
      console.log(user);

      const profile = await this.repositryProfile.save(user);
      console.log(
        '🚀 ~ file: auth.service.ts:55 ~ AuthService ~ createUser ~ profile',
        profile,
      );

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

  async login(userObject: LoginAuthDto): Promise<LoginResponse> {
    const { email, password } = userObject;
    const findUser = await this.usersRepository.findOne({ where: { email } });

    if (!findUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const checkPass = await compare(password, findUser.password);

    if (!checkPass) {
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);
    }

    const payload = {
      user_id: findUser.user_id,
      username: findUser.username,
      email: findUser.email,
    };

    const token = await this.jwtServie.sign(payload);

    const data = {
      token,
    };

    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }
}

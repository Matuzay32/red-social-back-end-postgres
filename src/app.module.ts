import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { CountriesModule } from './countries/countries.module';
import { Country } from './countries/entities/country.entity';
import { GenderModule } from './gender/gender.module';
import { Gender } from './gender/entities/gender.entity';
import { SentimentalModule } from './sentimental/sentimental.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: false, isGlobal: true }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Country, Gender],
      synchronize: true,
    }),
    CountriesModule,
    GenderModule,
    SentimentalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

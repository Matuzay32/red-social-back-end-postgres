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
import { Sentimental } from './sentimental/entities/sentimental.entity';
import { TypeAcountModule } from './type-acount/type-acount.module';
import { TypeAcount } from './type-acount/entities/type-acount.entity';
import { FriendModule } from './friend/friend.module';
import { ProfileModule } from './profile/profile.module';
import { Friend } from './friend/entities/friend.entity';
import { Profile } from './profile/entities/profile.entity';
import { HeartModule } from './heart/heart.module';
import { Heart } from './heart/entities/heart.entity';
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
      entities: [
        User,
        Country,
        Gender,
        Sentimental,
        TypeAcount,
        Friend,
        Profile,
        Heart,
      ],
      synchronize: true,
    }),
    CountriesModule,
    GenderModule,
    SentimentalModule,
    TypeAcountModule,
    FriendModule,
    ProfileModule,
    HeartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

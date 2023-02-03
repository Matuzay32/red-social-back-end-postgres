import { Module } from '@nestjs/common';
import { HeartService } from './heart.service';
import { HeartController } from './heart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heart } from './entities/heart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Heart])],
  controllers: [HeartController],
  providers: [HeartService],
})
export class HeartModule {}

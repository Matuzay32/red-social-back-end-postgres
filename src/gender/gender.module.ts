import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderController } from './gender.controller';
import { Gender } from './entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}

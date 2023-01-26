import { Module } from '@nestjs/common';
import { SentimentalService } from './sentimental.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentimentalController } from './sentimental.controller';
import { Sentimental } from './entities/sentimental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sentimental])],
  controllers: [SentimentalController],
  providers: [SentimentalService],
})
export class SentimentalModule {}

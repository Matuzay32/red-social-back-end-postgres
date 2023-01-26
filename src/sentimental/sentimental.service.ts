import { Injectable } from '@nestjs/common';
import { CreateSentimentalDto } from './dto/create-sentimental.dto';
import { UpdateSentimentalDto } from './dto/update-sentimental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sentimental } from './entities/sentimental.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SentimentalService {
  constructor(
    @InjectRepository(Sentimental)
    private sentimentalRepository: Repository<Sentimental>,
  ) {}

  create(createSentimentalDto: CreateSentimentalDto) {
    return 'This action adds a new sentimental';
  }

  findAll() {
    return `This action returns all sentimental`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sentimental`;
  }

  update(id: number, updateSentimentalDto: UpdateSentimentalDto) {
    return `This action updates a #${id} sentimental`;
  }

  remove(id: number) {
    return `This action removes a #${id} sentimental`;
  }
}

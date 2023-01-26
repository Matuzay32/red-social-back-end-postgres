import { Test, TestingModule } from '@nestjs/testing';
import { SentimentalController } from './sentimental.controller';
import { SentimentalService } from './sentimental.service';

describe('SentimentalController', () => {
  let controller: SentimentalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentimentalController],
      providers: [SentimentalService],
    }).compile();

    controller = module.get<SentimentalController>(SentimentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

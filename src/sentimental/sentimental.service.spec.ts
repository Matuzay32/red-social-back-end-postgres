import { Test, TestingModule } from '@nestjs/testing';
import { SentimentalService } from './sentimental.service';

describe('SentimentalService', () => {
  let service: SentimentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentalService],
    }).compile();

    service = module.get<SentimentalService>(SentimentalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

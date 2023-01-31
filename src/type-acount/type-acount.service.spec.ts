import { Test, TestingModule } from '@nestjs/testing';
import { TypeAcountService } from './type-acount.service';

describe('TypeAcountService', () => {
  let service: TypeAcountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeAcountService],
    }).compile();

    service = module.get<TypeAcountService>(TypeAcountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

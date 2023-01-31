import { Test, TestingModule } from '@nestjs/testing';
import { TypeAcountController } from './type-acount.controller';
import { TypeAcountService } from './type-acount.service';

describe('TypeAcountController', () => {
  let controller: TypeAcountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeAcountController],
      providers: [TypeAcountService],
    }).compile();

    controller = module.get<TypeAcountController>(TypeAcountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

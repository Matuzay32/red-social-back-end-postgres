import { Test, TestingModule } from '@nestjs/testing';
import { HeartController } from './heart.controller';
import { HeartService } from './heart.service';

describe('HeartController', () => {
  let controller: HeartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartController],
      providers: [HeartService],
    }).compile();

    controller = module.get<HeartController>(HeartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

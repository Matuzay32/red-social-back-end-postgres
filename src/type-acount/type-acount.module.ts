import { Module } from '@nestjs/common';
import { TypeAcountService } from './type-acount.service';
import { TypeAcountController } from './type-acount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAcount } from './entities/type-acount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeAcount])],
  controllers: [TypeAcountController],
  providers: [TypeAcountService],
})
export class TypeAcountModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeAcountService } from './type-acount.service';
import { CreateTypeAcountDto } from './dto/create-type-acount.dto';
import { UpdateTypeAcountDto } from './dto/update-type-acount.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('type-acount')
@ApiTags('typeAcount')
export class TypeAcountController {
  constructor(private readonly typeAcountService: TypeAcountService) {}

  @Post()
  create(@Body() createTypeAcountDto: CreateTypeAcountDto) {
    return this.typeAcountService.create(createTypeAcountDto);
  }

  @Get()
  findAll() {
    return this.typeAcountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeAcountService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeAcountDto: UpdateTypeAcountDto,
  ) {
    return this.typeAcountService.update(+id, updateTypeAcountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeAcountService.remove(+id);
  }
}

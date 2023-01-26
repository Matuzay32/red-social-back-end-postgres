import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SentimentalService } from './sentimental.service';
import { CreateSentimentalDto } from './dto/create-sentimental.dto';
import { UpdateSentimentalDto } from './dto/update-sentimental.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sentimental')
@Controller('sentimental')
export class SentimentalController {
  constructor(private readonly sentimentalService: SentimentalService) {}

  @Post()
  create(@Body() createSentimentalDto: CreateSentimentalDto) {
    return this.sentimentalService.create(createSentimentalDto);
  }

  @Get()
  findAll() {
    return this.sentimentalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentimentalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSentimentalDto: UpdateSentimentalDto,
  ) {
    return this.sentimentalService.update(+id, updateSentimentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sentimentalService.remove(+id);
  }
}

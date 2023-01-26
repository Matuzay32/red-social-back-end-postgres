import { PartialType } from '@nestjs/swagger';
import { CreateSentimentalDto } from './create-sentimental.dto';

export class UpdateSentimentalDto extends PartialType(CreateSentimentalDto) {}

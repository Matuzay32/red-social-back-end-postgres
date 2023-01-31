import { PartialType } from '@nestjs/swagger';
import { CreateTypeAcountDto } from './create-type-acount.dto';

export class UpdateTypeAcountDto extends PartialType(CreateTypeAcountDto) {}

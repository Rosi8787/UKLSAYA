import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalisiDto } from './create-analisi.dto';

export class UpdateAnalisiDto extends PartialType(CreateAnalisiDto) {}

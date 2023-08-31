import { Type } from 'class-transformer';
import { IsOptional, IsString, Max } from 'class-validator';

const MAX_RECORDS_PER_AGE = 10;

export class QueryDto {
  @Type(() => Number)
  @Max(MAX_RECORDS_PER_AGE)
  take: number = MAX_RECORDS_PER_AGE;

  @Type(() => Number)
  skip: number;

  @IsString()
  @IsOptional()
  title: string;
}

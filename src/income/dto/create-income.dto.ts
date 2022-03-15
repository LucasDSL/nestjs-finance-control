import { IsString, IsNumber, IsDateString } from 'class-validator';
export class CreateIncomeDto {
  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsDateString()
  date: Date;
}

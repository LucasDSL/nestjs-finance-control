import { IsString, IsNumber, IsDateString } from 'class-validator';
export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsDateString()
  date: Date;
}

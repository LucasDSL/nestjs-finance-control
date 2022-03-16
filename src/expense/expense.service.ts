import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private ExepenseRepository: Repository<Expense>,
  ) {}

  validDate(creatingDate: Date, dateOfExistingExpense: Date): boolean {
    if (creatingDate.getMonth() == dateOfExistingExpense.getMonth()) {
      return false;
    }
    return true;
  }

  async create(createExpenseDto: CreateExpenseDto) {
    const existingExpense = await this.ExepenseRepository.find({
      description: createExpenseDto.description,
    });
    for (const income of existingExpense) {
      if (!this.validDate(createExpenseDto.date, income.date)) {
        throw new BadRequestException(
          'Description already registered this month',
        );
      }
    }
    return this.ExepenseRepository.save(createExpenseDto);
  }

  findAll() {
    return this.ExepenseRepository.find();
  }

  findOne(id: string) {
    return this.ExepenseRepository.findOne({ id });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const incomeToUpdate = await this.ExepenseRepository.findOne({ id });
    if (updateExpenseDto.description) {
      const existingIncome = await this.ExepenseRepository.findOne({
        description: updateExpenseDto.description,
      });
      if (!this.validDate(incomeToUpdate.date, existingIncome.date)) {
        throw new BadRequestException(
          'Description already registered this month',
        );
      }
    }

    return this.ExepenseRepository.update({ id }, updateExpenseDto);
  }

  remove(id: string) {
    return this.ExepenseRepository.delete({ id });
  }
}

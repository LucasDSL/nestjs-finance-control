import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income) private IncomeRepository: Repository<Income>,
  ) {}

  validDate(creatingDate: Date, dateOfExistingIncome: Date): boolean {
    if (creatingDate.getMonth() == dateOfExistingIncome.getMonth()) {
      return false;
    }
    return true;
  }

  async create(createIncomeDto: CreateIncomeDto) {
    const existingIncomes = await this.IncomeRepository.find({
      description: createIncomeDto.description,
    });
    for (const income of existingIncomes) {
      if (!this.validDate(createIncomeDto.date, income.date)) {
        throw new BadRequestException(
          'Description already registered this month',
        );
      }
    }
    return this.IncomeRepository.save(createIncomeDto);
  }

  findAll() {
    return this.IncomeRepository.find();
  }

  findOne(id: string) {
    return this.IncomeRepository.findOne({ id });
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto) {
    const incomeToUpdate = await this.IncomeRepository.findOne({ id });
    if (updateIncomeDto.description) {
      const existingIncome = await this.IncomeRepository.findOne({
        description: updateIncomeDto.description,
      });
      if (!this.validDate(incomeToUpdate.date, existingIncome.date)) {
        throw new BadRequestException(
          'Description already registered this month',
        );
      }
    }

    return this.IncomeRepository.update({ id }, updateIncomeDto);
  }

  remove(id: string) {
    return this.IncomeRepository.delete({ id });
  }
}

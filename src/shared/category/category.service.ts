import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepo: Repository<Category>,
  ) {}

  findIdByName(name: string) {
    return this.CategoryRepo.findOne({ name }, { select: ['id'] });
  }
}

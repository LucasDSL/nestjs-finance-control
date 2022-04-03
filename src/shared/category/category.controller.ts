import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() { name }) {
    return this.categoryService.create(name);
  }
}

import { Expense } from 'src/expense/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Income, (income) => income.category)
  incomes: Income[];

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: [];
}

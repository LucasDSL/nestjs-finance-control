import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncomeModule } from './income/income.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Income } from './income/entities/income.entity';
import { ExpenseModule } from './expense/expense.module';
import { Expense } from './expense/entities/expense.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IncomeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [Income, Expense],
      synchronize: true,
    }),
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

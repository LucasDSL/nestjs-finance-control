import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
} from 'typeorm';
@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @BeforeInsert()
  @BeforeUpdate()
  updatedAt: Date;
}

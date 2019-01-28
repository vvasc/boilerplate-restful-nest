import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  modelo: string;

  @Column('text')
  description: string;
}

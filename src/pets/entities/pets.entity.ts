import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_pets: string;

  @Column()
  name_pets: string;

  @Column()
  year: number;

  @Column()
  color: string;
}

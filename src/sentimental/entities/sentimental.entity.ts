import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sentimental {
  @PrimaryGeneratedColumn()
  sentimental_id: number;
  @Column()
  name: string;
}

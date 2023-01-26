import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  gander_id: number;
  @Column()
  name: string;
}

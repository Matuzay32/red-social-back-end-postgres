import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class TypeAcount {
  @PrimaryGeneratedColumn()
  typeAcount_id: number;

  @Column()
  name: string;
}

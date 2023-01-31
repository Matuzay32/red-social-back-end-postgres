import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class Friend {
  @PrimaryGeneratedColumn()
  friend_id: number;

  @Column()
  name: string;
}

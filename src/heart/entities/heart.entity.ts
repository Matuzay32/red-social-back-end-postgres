import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Heart {
  @PrimaryGeneratedColumn()
  heart_id: number;

  @Column({ default: false })
  liked: boolean;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: new Date(Date.now()) })
  created_at: Date;
}

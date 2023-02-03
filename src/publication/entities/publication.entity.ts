import { User } from 'src/users/entities/user.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Publication {
  @PrimaryGeneratedColumn()
  post_id: number;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  text: string;

  @Column({ nullable: true })
  media: string;

  @Column({ default: new Date(Date.now()) })
  createdAt: Date;

  @Column({ default: new Date(Date.now()) })
  updatedAt: Date;
}

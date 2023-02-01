import { Country } from 'src/countries/entities/country.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Sentimental } from 'src/sentimental/entities/sentimental.entity';
import { TypeAcount } from 'src/type-acount/entities/type-acount.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  country_id: number;

  @Column()
  gender_id: number;

  @Column()
  user_id: number;

  @Column()
  sentimental_id: number;

  @Column()
  typeAcount_id: number;

  @ManyToOne((type) => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ManyToOne((type) => Gender)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToOne((type) => Sentimental)
  @JoinColumn({ name: 'sentimental_id' })
  sentimental: Sentimental;

  @ManyToOne((type) => TypeAcount)
  @JoinColumn({ name: 'typeAcount_id' })
  typeAcount: TypeAcount;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

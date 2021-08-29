import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entitity';
import { User } from './user.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column()
  user_name: string;

  @Column()
  dob: string;

  @Column()
  bio: number;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: User;
}

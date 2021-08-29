import { OneToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './base.entitity';
import { Profile } from './profile.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
  public profile?: Profile;
}

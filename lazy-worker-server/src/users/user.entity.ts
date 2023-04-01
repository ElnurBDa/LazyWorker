import { randomInt } from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public userId!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'text' })
  public interests: string;
  // it would be something like 'WebDeveloper_Content Writer_Mobile Developer',
  // while retrieving this data it will be converted into array of strings
  // => ['WebDeveloper', 'Content Writer', 'Mobile Developer']

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ default: randomInt(1000, 10000) })
  public otp: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}

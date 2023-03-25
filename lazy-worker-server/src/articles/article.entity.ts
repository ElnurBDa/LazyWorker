import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  public postId!: number;

  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @Column({ type: 'varchar', length: 120 })
  public author: string;

  @Column({ type: 'varchar', length: 120 })
  public website: string;

  @Column({ type: 'varchar', length: 120 })
  public redirectLink: string;

  @Column({ type: 'varchar', length: 120 })
  public category: string; // it is related with interests in user.entity.ts

  @Column({ type: 'text' })
  public description: string;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}

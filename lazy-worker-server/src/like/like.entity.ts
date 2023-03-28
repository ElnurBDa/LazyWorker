import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  likeId: number;

  @Column()
  userId: number;

  @Column()
  postId: number;
}

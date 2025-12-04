import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  username: string;

  @Column({ length: 200, nullable: true })
  displayName?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

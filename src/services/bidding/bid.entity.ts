import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'bids' })
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 36 })
  auctionId: string;

  @Column({ length: 100 })
  bidderId: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

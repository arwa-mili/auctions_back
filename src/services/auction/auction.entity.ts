import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum AuctionStatus {
  Draft = 'draft',
  Active = 'active',
  Closed = 'closed'
}

@Entity({ name: 'auctions' })
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  startPrice: number;

  @Column({ type: 'timestamptz' })
  endsAt: Date;

  @Column({ type: 'varchar', length: 32, default: AuctionStatus.Draft })
  status: AuctionStatus;

  @Column({ length: 100, nullable: true })
  ownerId?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

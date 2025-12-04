import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Auction } from '../services/auction/auction.entity';
import { User } from '../services/identity/user.entity';
import { Bid } from '../services/bidding/bid.entity';
import * as dotenv from 'dotenv';
dotenv.config();

async function seed() {
  const ds = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'auctions',
    entities: [Auction, User, Bid],
    synchronize: true
  });

  await ds.initialize();

  const userRepo = ds.getRepository(User);
  const auctionRepo = ds.getRepository(Auction);
  const bidRepo = ds.getRepository(Bid);

  const u1 = userRepo.create({ username: 'alice', displayName: 'Alice' });
  const u2 = userRepo.create({ username: 'bob', displayName: 'Bob' });
  await userRepo.save([u1, u2]);

  const a1 = auctionRepo.create({
    title: 'Vintage Camera',
    description: 'A classic film camera',
    startPrice: 150.0,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    status: 'active',
    ownerId: u1.id
  });

  const a2 = auctionRepo.create({
    title: 'Rare Book',
    description: 'First edition',
    startPrice: 300.0,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
    status: 'active',
    ownerId: u2.id
  });

  await auctionRepo.save([a1, a2]);

  const b1 = bidRepo.create({ auctionId: a1.id, bidderId: u2.id, amount: 160.0 });
  await bidRepo.save(b1);

  console.log('Seed completed');
  await ds.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

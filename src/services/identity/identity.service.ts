import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class IdentityService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async findAll() {
    return this.users.find({ order: { createdAt: 'DESC' } });
  }

  async create(username: string, displayName?: string) {
    const u = this.users.create({ username, displayName });
    return this.users.save(u);
  }

  async findOne(id: string) {
    return this.users.findOneBy({ id });
  }
}

import { Users } from '@/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(
    @InjectEntityManager()
    private readonly dataSource: DataSource,
    private readonly entityManager: EntityManager,
  ) {
    super(Users, dataSource.manager);
  }

  async findOneUser(email: string): Promise<Users> {
    return this.findOne({ where: { email } });
  }
}

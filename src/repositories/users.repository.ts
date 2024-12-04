import { Users } from '@/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, DeleteResult, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly dataSource: DataSource,
  ) {
    super(Users, dataSource.manager);
  }

  async findOneUser(email: string): Promise<Users> {
    return this.entityManager.findOne(Users, { where: { email } });
  }

  async createUser(data: Partial<Users>): Promise<Users> {
    const user = this.create(data);
    return this.save(user);
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.softDelete(id);
  }

  async getUsers(): Promise<Users[]> {
    return this.find();
  }
}

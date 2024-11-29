import { UsersRepository } from '@/repositories/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findOneWithEmail(email: string) {
    const user = await this.usersRepository.findOneUser(email);
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<Users> {
    return await this.usersRepository.createUser(data);
  }
}

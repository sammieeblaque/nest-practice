import { UsersRepository } from '@/repositories/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

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
}

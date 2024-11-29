import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from '@/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [TypeOrmModule.forFeature([UsersRepository, Users])],
  exports: [UsersService],
})
export class UsersModule {}

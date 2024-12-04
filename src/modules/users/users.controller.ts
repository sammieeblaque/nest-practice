import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.createUser(body);
  }

  @Get()
  async findAllUsers() {
    return await this.usersService.getUsers();
  }

  @Delete()
  async deleteUser(@Query() id: number) {
    return await this.usersService.deleteUser(id);
  }
}

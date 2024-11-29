import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = this.authService.login(body);
    return result;
  }

  @Get('hello')
  async getHello() {
    return 'Hello World!';
  }
}

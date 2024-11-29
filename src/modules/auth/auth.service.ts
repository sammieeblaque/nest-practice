import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithEmail(email);
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, password: user.password };
    const result = await this.validateUser(user.email, user.password);

    if (!result) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
      });
    }

    return {
      result,
      access_token: this.jwtService.sign(payload),
    };
  }
}

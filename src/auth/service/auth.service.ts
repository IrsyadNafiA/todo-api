import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/service/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterInterface, UserInterface } from '@types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<UserInterface> | null> {
    const user = await this.userService.findByUsername(username);

    const isValidate = user && (await bcrypt.compare(password, user.password));
    if (isValidate) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Partial<UserInterface>) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: RegisterInterface) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);
    return this.userService.create({ ...data, password: hash });
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RequestWithUserInterface } from '@types';
import { JwtAuthGuard } from '@auth/jwt/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('refresh')
  refresh(@Body() body: { refresh_token: string }) {
    try {
      const accessExpiration = this.configService.get<string>(
        'JWT_ACCESS_EXPIRATION',
      );
      const payload = this.jwtService.verify(body.refresh_token);

      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub, role: payload.role },
        { expiresIn: accessExpiration },
      );
      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException('Refresh token invalid');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req: RequestWithUserInterface) {
    return req.user;
  }
}

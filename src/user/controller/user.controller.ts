import { JwtAuthGuard } from '@auth/jwt/jwt-auth.guard';
import { Roles } from '@auth/roles/roles.decorator';
import { RolesGuard } from '@auth/roles/roles.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '@user/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('users')
  getAllUsers() {
    return this.userService.findAll();
  }
}

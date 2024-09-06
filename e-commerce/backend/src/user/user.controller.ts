import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/auth.metadata';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly auth: AuthService,
  ) {}

  @Public()
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.user.register(
      dto.email,
      dto.username,
      dto.password,
    );

    const token = await this.auth.login(dto.username, dto.password);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/api',
      maxAge: 60 * 60 * 1000,
    });

    return response;
  }
}

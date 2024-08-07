import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Request, Response } from 'express';
import { Public } from './auth.metadata';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly config: ConfigService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.auth.login(dto.username, dto.password);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/api',
      maxAge: 60 * 60 * 1000,
    });
    return { statusCode: 200, message: 'Sucessfully logged in' };
  }

  @Get('logout')
  logout(@Req() req: Request) {
    return this.auth.logout(req.cookies.token);
  }

  @Get('me')
  me(@Req() req: Request) {
    const user = req['user'];
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}

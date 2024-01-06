import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/auth.metadata';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.user.register(dto.email, dto.username, dto.password);
  }
}

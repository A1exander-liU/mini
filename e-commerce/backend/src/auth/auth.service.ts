import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly blacklist: BlacklistService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { username } });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const correctPassword = await compare(password, user.hash);
    if (!correctPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwt.sign(user, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '1h',
    });

    return token;
  }

  async logout(token: string) {
    await this.blacklist.blacklistToken(token);
    return { statusCode: 200, message: 'Logged out successfully' };
  }
}

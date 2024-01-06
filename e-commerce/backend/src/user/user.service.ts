import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, username: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: { email, username },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    await this.prisma.users.create({
      data: { email, username, hash: hashedPassword },
    });

    return { statusCode: 201, message: 'Sucessfully registered user' };
  }
}

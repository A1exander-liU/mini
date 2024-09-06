import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports: [PrismaModule, AuthModule, BlacklistModule],
})
export class UserModule {}

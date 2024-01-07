import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, BlacklistModule],
})
export class AuthModule {}

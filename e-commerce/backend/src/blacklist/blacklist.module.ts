import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  providers: [BlacklistService],
  imports: [RedisModule],
})
export class BlacklistModule {}

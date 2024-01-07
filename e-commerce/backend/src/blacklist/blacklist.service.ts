import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BlacklistService {
  constructor(private readonly redis: RedisService) {}
}

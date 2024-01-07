import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BlacklistService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {}

  async blacklistToken(token: string) {
    const payload = await this.jwt.verify(token, {
      secret: this.config.get('JWT_SECRET'),
    });

    const exp = payload.exp;
    const ttl = exp - Math.ceil(Date.now() / 1000);

    await this.redis.client.set(token, ttl);
    await this.redis.client.expire(token, ttl);
  }

  async isBlacklistedToken(token: string) {
    const tokenInRedis = await this.redis.client.get(token);
    return tokenInRedis != null;
  }
}

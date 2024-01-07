import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  private _client: ReturnType<typeof createClient>;
  constructor(private readonly config: ConfigService) {
    const redisClient = createClient({
      password: config.get('REDIS_PASSWORD'),
      socket: {
        host: config.get('REDIS_HOST'),
        port: config.get<number>('REDIS_PORT'),
      },
    });
    this._client = redisClient;
    this._client
      .connect()
      .then(() => this.logger.log('Connected to Redis'))
      .catch(() => {
        throw new ServiceUnavailableException('Could not connect to Redis');
      });
  }

  public get client() {
    return this._client;
  }
}

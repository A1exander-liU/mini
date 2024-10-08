import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PUBLIC_KEY, ROLES_KEY } from './auth.metadata';
import { Request } from 'express';
import { BlacklistService } from 'src/blacklist/blacklist.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly blacklist: BlacklistService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies.token;

    try {
      const payload = this.jwt.verify(token, {
        secret: this.config.get('JWT_SECRET'),
      });

      const isBlacklisted = await this.blacklist.isBlacklistedToken(token);
      if (isBlacklisted) {
        throw new UnauthorizedException('token is expired');
      }

      request['user'] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    return roles.includes(request['user'].role);
  }
}

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';
import { IS_PUBLIC_KEY } from './public.decorator';
import { DASHBOARD_AUTH_COOKIE } from '../../constants/cookies';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.getIsPublic(context);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);
    console.log('token', token);
    if (!token) {
      throw new UnauthorizedException('MISSING_TOKEN');
    }
    const role = await this.authService.findRoleBySessionToken(token);
    if (!role) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }
    const requiredRoles = this.getRequiredRoles(context);
    if (!requiredRoles) {
      return true;
    }
    const isAuthorized = requiredRoles.some(
      (requiredRole) => requiredRole === role,
    );
    if (!isAuthorized) {
      throw new ForbiddenException('INVALID_ROLE');
    }
    return isAuthorized;
  }

  private getIsPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getRequiredRoles(context: ExecutionContext): Role[] {
    return this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    return request.cookies[DASHBOARD_AUTH_COOKIE];
  }
}

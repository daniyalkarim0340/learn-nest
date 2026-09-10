import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { UserRole } from '../entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    // Get the roles required by the endpoint
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    // If no role is required, allow the request
    if (!requiredRoles) {
      return true;
    }

    // Get the HTTP request
    const request = context.switchToHttp().getRequest();

    // Get logged-in user
    const user = request.user;

    // Check whether user's role is allowed
    return requiredRoles.includes(user.role);
  }
}
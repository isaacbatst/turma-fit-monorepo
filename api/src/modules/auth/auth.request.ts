import { Request } from 'express';
import { Role } from './roles.enum';

export interface AuthRequest extends Request {
  auth: {
    role: Role;
  };
}

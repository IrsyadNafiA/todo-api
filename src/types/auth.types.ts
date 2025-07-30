import { Request } from 'express';

export interface JwtPayloadInterface {
  sub: number;
  username: string;
  role: string;
}

export interface RequestWithUserInterface extends Request {
  user: JwtPayloadInterface;
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface RegisterInterface {
  username: string;
  password: string;
}

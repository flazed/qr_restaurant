import { JwtPayload } from 'jwt-decode';

export type JWTToken = {
  token: string
};

export type User = {
  name: string
  password: string
};

export type FullUser = {
  role: UserRoles
} & User;

export type UserToken = JwtPayload & Pick<FullUser, 'name' | 'role'>;

export enum UserRoles {
  Admin = 2,
  User = 1
}

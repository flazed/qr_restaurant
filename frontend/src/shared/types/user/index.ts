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

export enum UserRoles {
  admin = 2,
  user = 1
}

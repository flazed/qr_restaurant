export type User = {
  name: string,
  password: string
}

export type FullUser = User & {
  role: UserRoles
}

export enum UserRoles {
  user = 1,
  admin = 2
}

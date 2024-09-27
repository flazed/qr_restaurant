export type { Product, ProductSQL } from './product';
export { WeightType } from './product';

export type { FullUser, User } from './user'
export { UserRoles } from './user'

export type GUID = { isGuid: true } & string;

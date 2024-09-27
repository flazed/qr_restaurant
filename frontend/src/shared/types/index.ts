export type { Product, ProductWithoutID } from './product';
export { WeightType } from './product';

export type {
  FullUser, JWTToken, User
} from './user';
export { UserRoles } from './user';

export type GUID = { isGuid: true } & string;

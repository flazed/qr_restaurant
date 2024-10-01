export type { Product, ProductWithoutID } from './product';
export { WeightType } from './product';

export type {
  EditableUser, FullUser, JWTToken, User, UserToken, UserWithId
} from './user';
export { UserRoles } from './user';

export type GUID = { isGuid: true } & string;

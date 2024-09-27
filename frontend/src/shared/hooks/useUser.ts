import { JwtPayload, jwtDecode } from 'jwt-decode';

import { FullUser } from '@shared/types';

type UserUser = {
  getDecodedToken: () => Pick<FullUser, 'name' | 'role'> | null
  getToken: () => null | string,
  isTokenValid: () => boolean
};

export const useUser = (): UserUser => {
  const decodeToken = (x: string) => jwtDecode(x) as JwtPayload & Pick<FullUser, 'name' | 'role'>;

  const isTokenValid = () => {
    const token = localStorage.getItem('token');

    if (!token) return false;
    try {
      const decoded = decodeToken(token);
      if (!decoded.exp || decoded.exp < Date.now() / 1000) return false;
      if (!decoded.name || !decoded.role) return false;

      return true;
    } catch (_) {
      return false;
    }
  };

  return {
    getDecodedToken: () => {
      if (isTokenValid()) {
        const token = localStorage.getItem('token') as string;
        return decodeToken(token);
      }
      return null;
    },
    getToken: () => localStorage.getItem('token'),
    isTokenValid
  };
};

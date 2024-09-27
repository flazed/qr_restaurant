import jwt from "jsonwebtoken";
import 'dotenv/config'

import { UserRoles } from "../types";

export const generateUserToken = (name: string, role: UserRoles): string | null => {
  const payload = { name, role }
  const tokenSecret = process.env.TOKEN_SECRET

  if(tokenSecret) {
    return jwt.sign(payload, tokenSecret, { expiresIn: '30 days'})
  }

  return null
}

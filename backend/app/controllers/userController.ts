import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { check, validationResult } from "express-validator";

import { pool } from "../config";
import { User, FullUser, UserRoles } from "../types";
import {generateUserToken} from "../utils";

const UserValidation = [
  check('name').exists().escape().trim().not().isEmpty().isString(),
  check('password').exists().escape().trim().not().isEmpty().isString(),
]

const UserCreateValidation = [
  ...UserValidation,
  check('role').exists().not().isEmpty().isIn(Object.values(UserRoles)),
]

const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if(errors.isEmpty()) {
    const {
      name,
      password,
      role
    } = req.body as FullUser

    const token = generateUserToken(name, role)

    if(token) {
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      pool.query('' +
        'INSERT INTO users (name, password, role) VALUES (?, ?, ?)',
        [name, hashPassword, role]
      )
        .then(() => res.status(200).send({ token }))
        .catch((_) => res.status(500).send('Error while add new user'))
    } else {
      return res.status(400).json('Error while generate JWT-token')
    }

  } else {
    return res.status(400).json(errors)
  }
}

const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if(errors.isEmpty()) {
    const {
      name,
      password
    } = req.body as User

    pool.query('SELECT * FROM users WHERE name=?', [name])
      .then(async (data) => {
        if(Array.isArray(data[0]) && data[0].length > 0) {
          const user = data[0][0] as FullUser

          const validPass = await compare(password, user.password);
          const token = generateUserToken(user.name, user.role)

          if(validPass && token) {
            return res.status(200).send({ token })
          } else {
            return res.status(400).json('Incorrect name or pass')
          }
        } else {
          return res.status(400).json('No find user with this name')
        }
      })
      .catch(() => res.status(500).json('Error while select user'))
  } else {
    return res.status(400).json(errors)
  }
}

export {
  UserValidation,
  UserCreateValidation,
  createUser,
  loginUser
}

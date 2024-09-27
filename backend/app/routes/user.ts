import { Router } from "express";

import {
  createUser,
  loginUser,
  UserCreateValidation,
  UserValidation
} from '../controllers/userController'

const router = Router()

router.use('/create', UserCreateValidation, createUser)
router.post('/login', UserValidation, loginUser)

export const userApi = router

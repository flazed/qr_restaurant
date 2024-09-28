import { Router } from "express";

import {
  createUser,
  loginUser,
  UserCreateValidation,
  UserValidation
} from '../controllers/userController'
import { authUser, isAdmin } from "../middleware/authUser";

const router = Router()

router.post('/create', authUser, isAdmin, UserCreateValidation, createUser)
router.post('/login', UserValidation, loginUser)

export const userApi = router

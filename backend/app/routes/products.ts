import { Router } from "express";

import {
  getProducts,
  ProductValidation,
  addProduct
} from '../controllers/productsController'

import { authUser, isAdmin } from "../middleware/authUser";

const router = Router()

router.use(authUser)
router.get('/', getProducts)
router.post('/', isAdmin, ProductValidation, addProduct)

export const productsApi = router

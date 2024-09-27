import { Router } from "express";

import {
  getProducts,
  ProductValidation,
  addProduct
} from '../controllers/productsController'

const router = Router()

router.get('/', getProducts)
router.post('/', ProductValidation, addProduct)

export const productsApi = router

import { Router } from "express";

import {
  getProducts,
  ProductValidation,
  addProduct,
  editProduct,
  deleteProduct
} from '../controllers/productsController'

import { authUser, isAdmin } from "../middleware/authUser";

const router = Router()

router.use(authUser)
router.get('/', getProducts)
router.post('/', isAdmin, ProductValidation, addProduct)
router.put('/:productId', isAdmin, ProductValidation, editProduct)
router.delete('/:productId', isAdmin, deleteProduct)

export const productsApi = router

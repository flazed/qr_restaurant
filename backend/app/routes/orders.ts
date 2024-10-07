import { Router } from "express";
import { authUser, isAdmin } from "../middleware/authUser";
import {
  BaseOrderValidation,
  WaiterOrderValidation,
  createWaiterOrder,
  createUserOrder,
  getOrders,
} from "../controllers/orderController";
import { isAvailableProducts } from "../middleware/order";

const router = Router()

router.get('/', authUser, getOrders)
router.post('/', BaseOrderValidation, isAvailableProducts, createUserOrder)
router.post('/admin', authUser, isAdmin, WaiterOrderValidation, isAvailableProducts, createWaiterOrder)

export const ordersApi = router

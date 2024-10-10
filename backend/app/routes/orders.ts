import { Router } from "express";
import { authUser, isAdmin } from "../middleware/authUser";
import {
  BaseOrderValidation,
  WaiterOrderValidation,
  createWaiterOrder,
  createUserOrder,
  getOrders,
  editWaiterOrder,
  changeOrderStatus,
} from "../controllers/orderController";
import { isAvailableProducts } from "../middleware/order";

const router = Router()

router.get('/', authUser, getOrders)
router.post('/', BaseOrderValidation, isAvailableProducts, createUserOrder)
router.post('/admin', authUser, WaiterOrderValidation, isAvailableProducts, createWaiterOrder)
router.patch('/admin/:orderId', authUser, WaiterOrderValidation, isAvailableProducts, editWaiterOrder)
router.patch('/admin/status/:orderId', authUser, WaiterOrderValidation, changeOrderStatus)

export const ordersApi = router

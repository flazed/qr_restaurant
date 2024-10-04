import { Router } from "express";
import { authUser, isAdmin } from "../middleware/authUser";
import {
  addMenu,
  deleteMenu,
  editMenu,
  getMenuAdmin,
  getMenuList,
  MenuValidation
} from "../controllers/menuController";

const router = Router()

router.get('/', getMenuList)
router.get('/admin', authUser, isAdmin, getMenuAdmin)
router.post('/', authUser, isAdmin, MenuValidation, addMenu)
router.put('/:menuId', authUser, isAdmin, MenuValidation, editMenu)
router.delete('/:menuId', authUser, isAdmin, deleteMenu)

export const menuApi = router

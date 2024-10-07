import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import { pool } from "../config";

import {FullUser, HasId, Order, OrderType, Product, Statuses, UserRoles, UserToken} from "../types";

const tokenSecret = process.env.TOKEN_SECRET

const BaseOrderValidation = [
  check('products').exists().isArray({ min: 1 }),
]

const WaiterOrderValidation = [
  ...BaseOrderValidation,
  check('waiter_id').exists().isInt().not().isString(),
  check('orderTable').exists().isInt().not().isString(),
]

const getOrders = async (req: Request, res: Response) => {
  const auth =  req.headers.authorization

  if(auth && tokenSecret) {
    const userToken = jwt.verify(auth.split(' ')[1], tokenSecret) as UserToken

    const [user] = await pool.query('SELECT * FROM users WHERE name=?', [userToken.name])

    if(Array.isArray(user) && user.length > 0) {
      const { id, role } = user[0] as HasId & FullUser;
      if(role === UserRoles.User) {
        // @ts-ignore
        pool.query('SELECT * FROM orders WHERE waiter_id=?', [id])
          .then((data) => res.status(200).json(data[0]))
          .catch((e) => res.status(500).json(e))
      } else {
        pool.query('SELECT * FROM orders')
          .then((data) => res.status(200).json(data[0]))
          .catch((e) => res.status(500).json(e))
      }
    }
  }
}

const createUserOrder = async (req: Request, res: Response) => {
  const { products } = req.body as Pick<Order, 'products'>
  const date = new Date().toJSON().split('T')[0];

  const totalPrice = await pool.query(`SELECT * FROM products WHERE id IN (${products})`)
    .then(([productsFromDB]) => {
      let price = 0
      for(const product of productsFromDB as Product[]) {
        price += product.price
      }
      return price
    })

  pool.query(
    `INSERT INTO orders (date, orderType, products, totalPrice, tips, status)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [date, OrderType.Self, JSON.stringify(products), totalPrice, 0, Statuses.Created]
  )
    .then(() => res.status(200).json())
    .catch((e) => res.status(500).json(e))
}

const createWaiterOrder = async (req: Request, res: Response) => {
  const { products, waiter_id, orderTable } = req.body as Pick<Order, 'products' | 'waiter_id' | 'orderTable'>
  const date = new Date().toJSON().split('T')[0];

  const isWaiterExist = await pool.query('SELECT * FROM users WHERE id=?', [waiter_id])
    .then(([waitersList]) => {
      if(Array.isArray(waitersList) && waitersList.length === 1) {
        return true
      }
      return false
    })
    .catch(() => false)

  const isTableExist = await pool.query('SELECT * FROM tables WHERE id=?', [orderTable])
    .then(([tablesList]) => {
      if(Array.isArray(tablesList) && tablesList.length === 1) {
        return true
      }
      return false
    })
    .catch(() => false)

  const totalPrice = await pool.query(`SELECT * FROM products WHERE id IN (${products})`)
    .then(([productsFromDB]) => {
      let price = 0
      for(const product of productsFromDB as Product[]) {
        price += product.price
      }
      return price
    })

  if(isWaiterExist && isTableExist) {
    pool.query(
      `INSERT INTO orders (date, orderType, products, totalPrice, tips, waiter_id, orderTable, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [date, OrderType.Self, JSON.stringify(products), totalPrice, 0, waiter_id, orderTable, Statuses.Created]
    )
      .then(() => res.status(200).json())
      .catch((e) => res.status(500).json(e))
  } else {
    return res.status(400).json('Waiter or table does not exist')
  }
}

export {
  BaseOrderValidation,
  WaiterOrderValidation,
  getOrders,
  createUserOrder,
  createWaiterOrder
}

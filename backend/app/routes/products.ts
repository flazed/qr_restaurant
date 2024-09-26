import { Router } from "express";
import { check, validationResult } from 'express-validator'

import { pool } from "../config";

import {Product, WeightType} from "../types";

const router = Router()

router.get('/', (req, res) => {
  pool.query('SELECT * FROM products')
    .then((data) => res.json(data[0]))
})

router.post('/', (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {
      name,
      weight,
      weightType,
      preview,
      description,
      price,
      inStopList
    } = req.body as Product

    pool.query(
      `INSERT INTO products (name, description, inStopList, price, weight, weightType, preview)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, inStopList, price, weight, weightType, preview]
    )
      .then(() => res.status(200).json())
      .catch(() => res.status(400).json())
  }
  res.status(400)
})

export const ProductValidation = [
  check('name').exists().escape().trim().not().isEmpty().isString(),
  check('description').exists().escape().trim().not().isEmpty().isString(),
  check('preview').optional().isURL(),
  check('inStopList').exists().not().isEmpty().isBoolean({strict: true}),
  check('price').exists().not().isEmpty().isInt({min: 1}).not().isString(),
  check('weight').exists().not().isEmpty().isInt({min: 1}).not().isString(),
  check('weightType').exists().escape().not().isEmpty().isIn(Object.values(WeightType)),
]
export const productsApi = router

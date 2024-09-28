import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import { pool } from "../config";

import {Product, ProductSQL, WeightType} from "../types";

const ProductValidation = [
  check('name').exists().escape().trim().not().isEmpty().isString(),
  check('description').exists().escape().trim().not().isEmpty().isString(),
  check('preview').optional().isURL(),
  check('inStopList').exists().not().isEmpty().isBoolean({strict: true}),
  check('price').exists().not().isEmpty().isInt({min: 1}).not().isString(),
  check('weight').exists().not().isEmpty().isInt({min: 1}).not().isString(),
  check('weightType').exists().escape().not().isEmpty().isIn(Object.values(WeightType)),
]

const getProducts = async (_: Request, res: Response) => {
  pool.query('SELECT * FROM products')
    .then((data) => {
      const formattedData: Product[] = []

      for(const x of data[0] as ProductSQL[]) {
        formattedData.push({
          ...x,
          inStopList: x.inStopList === 1
        })
      }

      return res.json(formattedData)
    })
}

const addProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) {
    const {
      name,
      weight,
      weightType,
      preview=  '',
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
  } else {
    return res.status(400).json(errors)
  }
}

export {
  ProductValidation,
  getProducts,
  addProduct
}

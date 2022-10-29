import { Request, Response } from "express"
import { ProductStore } from "../models/productModel"

const store = new ProductStore()

export const index = async (req: Request, res: Response) => {
  const result = await store.index();
  res.json({ result })
}

export const create = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  const result = await store.create(name, price, category);
  res.status(200).json({ result });
}

export const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await store.show(id);
  res.status(200).json({ result })
}

export const productsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const result = await store.productsByCategory(category);
  res.status(200).json({ result });
}
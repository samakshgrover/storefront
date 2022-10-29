import { Request, Response } from "express";
import { OrderStore } from "../models/orderModel";

const store = new OrderStore();

export const index = async (req: Request, res: Response) => {
  const result = await store.index();
  res.status(200).json({ result })
}

export const removeOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params
  const result = await store.removeOrder(orderId);
  res.status(200).json({ result: "success" })
}

export const addOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await store.addOrder(userId);
  res.status(200).json({ result })
}

export const addProducts = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { productId, quantity } = req.body;
  const result = await store.addProducts(orderId, productId, quantity);
  res.status(200).json({ result });
}


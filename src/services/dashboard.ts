import { Application, Request, Response } from "express"
import { authenticate } from "../handlers/authHandler";
import { DashboardStore } from "./dashboardModel"

const store = new DashboardStore();

const top5Products = async (req: Request, res: Response) => {
  const result = await store.top5Products();
  res.status(200).json({ result })
}

const currentOrderByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await store.currentOrderByUser(userId);
  res.status(200).json({ result });
}

const completedOrdersByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await store.completedOrdersByUser(userId);
  res.status(200).json({ result })
}

export const dashboardRoutes = (app: Application) => {
  app.get('/top5products', top5Products)
  app.get('/currentorders/:userId', authenticate, currentOrderByUser)
  app.get('/completedorders/:userId', authenticate, completedOrdersByUser)
}
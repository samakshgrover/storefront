import { Router } from "express";
import { authenticate } from "../handlers/authHandler";
import { addOrder, addProducts, index, removeOrder } from "../handlers/orderHandler";

const router = Router();

router.get('/', authenticate, index);
router.post('/:userId', authenticate, addOrder);
router.delete('/:orderId', authenticate, removeOrder);
router.post('/:orderId/products', authenticate, addProducts);

export default router;
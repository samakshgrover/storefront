import { Router } from "express";
import { addOrder, addProducts, index, removeOrder } from "../handlers/orderHandler";

const router = Router();

router.get('/', index);
router.post('/:userId', addOrder);
router.delete('/:orderId', removeOrder);
router.post('/:orderId/products', addProducts);

export default router;
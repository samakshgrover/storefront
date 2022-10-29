import { Router } from "express";
import { authenticate } from "../handlers/authHandler";
import { create, index, productsByCategory, show } from "../handlers/productHandler";

const router = Router()

router.get('/', index);
router.post('/', authenticate,create);
router.get('/:id', show);
router.get('/category/:category', productsByCategory);

export default router;
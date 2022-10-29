import { Router } from "express";
import { authenticate } from "../handlers/authHandler";
import { create, index, login, show } from "../handlers/userHandler";

const router = Router();

router.get("/", authenticate, index);
router.get('/:id', authenticate, show)
router.post("/", create);
router.post('/login', login);

export default router;

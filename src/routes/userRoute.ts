import { Router } from "express";
import { authenticate } from "../handlers/authHandler";
import {
  create,
  deleteUser,
  index,
  login,
  show,
} from "../handlers/userHandler";

const router = Router();

router.get('/test', (_req, res) => {
  res.json({ result: "test" })
})
router.get("/:id", authenticate, show);
router.get("/", authenticate, index);
router.delete("/:id", authenticate, deleteUser);
router.post("/", create);
router.post("/login", login);

export default router;

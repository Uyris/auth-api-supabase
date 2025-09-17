// src/routes/authRoutes.ts
import { Router } from "express";
import {
  login,
  createUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController";
import { isAuth, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

// Login
router.post("/login", login);

// Criar usuário (somente admin)
router.post("/admin/cadastrar", isAuth, isAdmin, createUser);

// Reset de senha
router.post("/reset/request", requestPasswordReset);
router.post("/reset/confirm", resetPassword);

export default router;

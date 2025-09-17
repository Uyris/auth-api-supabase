// src/routes/authRoutes.ts
import { Router } from "express";
import { 
  login, 
  requestPasswordReset, 
  verifyResetCode, 
  resetPassword 
} from "../controllers/authController";

const router = Router();

router.post("/login", login);

// Fluxo de reset em 3 etapas
router.post("/reset/request", requestPasswordReset);
router.post("/reset/verify", verifyResetCode);
router.post("/reset/confirm", resetPassword);

export default router;

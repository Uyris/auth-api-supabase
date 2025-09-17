// src/routes/adminRoutes.ts
import { Router } from "express";
import { cadastrarUsuario } from "../controllers/adminController";
import { isAuth } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.post("/cadastrar", isAuth, isAdmin, cadastrarUsuario);

export default router;

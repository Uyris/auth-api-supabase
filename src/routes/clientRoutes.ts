// src/routes/clientRoutes.ts
import { Router } from "express";
import { clientArea } from "../controllers/clientController";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, clientArea);

export default router;

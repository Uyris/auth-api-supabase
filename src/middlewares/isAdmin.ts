// src/middlewares/isAdmin.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Acesso restrito a administradores" });
  }
  next();
};

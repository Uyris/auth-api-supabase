// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token ausente" });

  try {
    const payload = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET as string
    );
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.role !== "admin") {
    return res.status(403).json({ error: "Acesso restrito a administradores" });
  }
  next();
};

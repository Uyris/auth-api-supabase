// src/controllers/clientController.ts
import { Request, Response } from "express";

export const clientArea = (req: Request, res: Response) => {
  res.json({ message: "Bem-vindo à área do cliente 🚀" });
};

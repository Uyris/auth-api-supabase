// src/controllers/authController.ts
import { Request, Response } from "express";
import * as authService from "../services/authService";

// 🔑 Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const session = await authService.login(email, password);
    res.json(session); // retorna access_token, refresh_token etc.
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

// 👤 Criar usuário (admin only)
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;
    const user = await authService.createUserAsAdmin(email, role);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// 🔐 Solicitar reset
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authService.requestPasswordReset(email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// 🔐 Redefinir senha
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const user = await authService.resetPassword(newPassword);
    res.json({ message: "Senha redefinida com sucesso", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

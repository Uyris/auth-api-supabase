// src/controllers/authController.ts
import { Request, Response } from "express";
import * as authService from "../services/authService";

// 🔑 Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

// 🔐 Solicitar código de reset
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset(email);
    res.json({ message: "Código de verificação enviado por email" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// 🔐 Verificar código
export const verifyResetCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const valid = await authService.verifyResetCode(email, code);
    if (valid) {
      res.json({ message: "Código válido, prossiga para redefinir a senha" });
    } else {
      res.status(400).json({ error: "Código inválido ou expirado" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// 🔐 Redefinir senha
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    await authService.resetPassword(email, newPassword);
    res.json({ message: "Senha redefinida com sucesso" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

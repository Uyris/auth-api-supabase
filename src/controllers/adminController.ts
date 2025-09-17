// src/controllers/adminController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;
    const newUser = await userService.createUser(email, role);
    res.json(newUser);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

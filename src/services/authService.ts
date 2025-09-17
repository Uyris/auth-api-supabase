// src/services/authService.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../utils/supabaseClient";
import { sendEmail } from "../utils/sendEmail";

const EXPIRATION_MINUTES = 10;

// Login
export const login = async (email: string, password: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Usuário não encontrado");
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    throw new Error("Email e/ou Senha incorretos.");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return token;
};

// Solicitar reset
export const requestPasswordReset = async (email: string) => {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) throw new Error("Usuário não encontrado");

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  const expiresAt = new Date(
    Date.now() + EXPIRATION_MINUTES * 60 * 1000
  ).toISOString();

  const { error } = await supabase
    .from("password_resets")
    .insert([{ email, code, expires_at: expiresAt }]);

  if (error) throw new Error("Erro ao salvar código de reset");

  await sendEmail(email, code, "reset"); // envia código por email
};

// Validar código
export const verifyResetCode = async (email: string, code: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("password_resets")
    .select("*")
    .eq("email", email)
    .eq("code", code)
    .eq("used", false)
    .single();

  if (error || !data) return false;

  const expired = new Date(data.expires_at) < new Date();
  return !expired;
};

// Redefinir senha
export const resetPassword = async (email: string, newPassword: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  const { error: userError } = await supabase
    .from("users")
    .update({ password_hash: hash })
    .eq("email", email);

  if (userError) throw new Error("Erro ao atualizar senha");

  await supabase
    .from("password_resets")
    .update({ used: true })
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1);
};

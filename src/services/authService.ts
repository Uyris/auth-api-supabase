// src/services/authService.ts
import { supabase } from "../utils/supabaseClient";

// 🔑 Login
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    throw new Error(error?.message || "Falha no login");
  }

  return data.session; // contém access_token (JWT), refresh_token etc.
};

// 👤 Criar usuário (apenas admin)
export const createUserAsAdmin = async (email: string, role: string) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: Math.random().toString(36).slice(-10), // senha aleatória
    email_confirm: true,
    app_metadata: { role },
  });

  if (error) throw new Error(error.message);
  return data.user;
};

// 🔐 Solicitar reset de senha
export const requestPasswordReset = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:4000/auth/reset-password-callback",
  });

  if (error) throw new Error(error.message);
  return { message: "Email de redefinição enviado" };
};

// 🔐 Redefinir senha (após clicar no link do email)
export const resetPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
  return data.user;
};

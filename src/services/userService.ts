// src/services/userService.ts
import bcrypt from "bcryptjs";
import { supabase } from "../utils/supabaseClient";
import { generatePassword } from "../utils/generatePassword";
import { sendEmail } from "../utils/sendEmail";

export const createUser = async (email: string, role: "admin" | "cliente") => {
  const rawPassword = generatePassword();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(rawPassword, salt);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, role, password_hash: hash }])
    .select();

  if (error) throw new Error("Erro ao criar usuário");

  await sendEmail(email, rawPassword, "welcome");

  return data;
};

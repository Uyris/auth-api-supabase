// src/utils/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// carrega .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Variáveis SUPABASE_URL ou SUPABASE_KEY não configuradas no .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey)
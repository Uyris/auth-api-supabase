// src/index.ts
import express, { Application } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import clientRoutes from "./routes/clientRoutes.ts";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Rotas principais
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/cliente", clientRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} !!!`);
});

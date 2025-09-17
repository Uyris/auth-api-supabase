// src/utils/sendEmail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true para 465, false para 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type EmailType = "welcome" | "reset";

export const sendEmail = async (to: string, content: string, type: EmailType) => {
  try {
    let htmlContent = "";

    if (type === "welcome") {
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #2d89ef; text-align: center;">🚀 Bem-vindo à Plataforma!</h2>
          <p style="font-size: 16px; color: #333;">
            Sua conta foi criada com sucesso. Aqui estão suas credenciais de acesso:
          </p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> ${to}</p>
            <p style="margin: 0; font-size: 16px;"><strong>Senha Inicial:</strong> ${content}</p>
          </div>
          <p style="font-size: 15px; color: #555;">
            Recomendamos que você altere sua senha após o primeiro login por questões de segurança.
          </p>
          <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">
            — Equipe Auth API
          </p>
        </div>
      `;
    }

    if (type === "reset") {
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #e67e22; text-align: center;">🔒 Recuperação de Senha</h2>
          <p style="font-size: 16px; color: #333;">
            Você solicitou a redefinição de sua senha. Use o código abaixo para continuar:
          </p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 3px;">${content}</p>
          </div>
          <p style="font-size: 15px; color: #555;">
            Este código expira em 10 minutos. Se você não solicitou essa ação, ignore este email.
          </p>
          <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">
            — Equipe Auth API
          </p>
        </div>
      `;
    }

    const subject =
      type === "welcome"
        ? "Credenciais de acesso - Auth API"
        : "Código de verificação - Auth API";

    const info = await transporter.sendMail({
      from: `"Auth API" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`📧 Email (${type}) enviado para ${to}: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    throw new Error("Falha no envio de email");
  }
};

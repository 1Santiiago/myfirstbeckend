import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Extende o tipo Request para carregar dados do usuário
export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {

  // 1️⃣ Pegar o header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  // 2️⃣ Extrair o token
  const token = authHeader.split(" ")[1];

  try {

    // 3️⃣ Verificar se o token é válido
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    // 4️⃣ Colocar dados do usuário na requisição
    req.userId = payload.id;
    req.userEmail = payload.email;

    // 5️⃣ Passar para a próxima função (rota)
    next();

  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
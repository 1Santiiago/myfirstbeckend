import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthRequest } from "../middlewares/auth.middleware";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ||
  "7d") as Jwt.SignOptions["expiresIn"];

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email já cadastrado" });
      return;
    }
    const user = await User.create({ name, email, password });

    const token = Jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

// Login

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    //verificar se o usuario existe
    const user = await User.findOne({ email }).select("+password");;
    if (!user) {
      res.status(401).json({ error: "Credenciais invalidas" });
      return;
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const token = Jwt.sign({ id: user._id, email: email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error); // adiciona isso
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};


//retornar usuario logado

export const me = async (req:AuthRequest, res:Response): Promise<void>=>{
  try {
      const user = await User.findById(req.userId)
      if(!user){
        res.status(404).json({error: 'Usuario não encontrado'})
        return 
      }
      res.json(user)
  } catch (error) {
     res.status(500).json({ error: "Erro ao buscar usuário" });
  }
}
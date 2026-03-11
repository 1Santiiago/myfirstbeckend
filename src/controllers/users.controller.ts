import { Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "Usuario nao encontrado" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

// create user

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error: any) {
    // erro de email duplicado
    if (error.code === 11000) {
      res.status(400).json({ error: "Email já cadastrado" });
      return;
    }
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// editando user

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { returnDocument: 'after' },
    );

    if (!user) {
      res.status(404).json({ error: "Usuario nao encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ error: "Usuario nao encontrado" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

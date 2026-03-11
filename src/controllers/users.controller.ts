import { Request, Response } from "express";
import { CreateUserBody, User } from "../types";
import * as db from '../data/database'




export const getAllUsers = (req: Request, res: Response): void => {
  res.json(db.users);
};

export const getUserById = (req: Request, res: Response): void => {
  const userId = Number(req.params.id);
  const user = db.users.find((u:User) => u.id === userId);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
  res.json(user);
};

// create user

export const createUser = (req: Request, res: Response): void => {
  const { name, email } = req.body as CreateUserBody
  if (!name || !email) {
    res.status(400).json({ error: "Nome e email são obrigatórios" });
  }
  const newUser = {
    id: db.getNextUserId(),
    name,
    email,
  };

  db.users.push(newUser);

  res.json({
    message: "Usuario criado com sucesso",
    user: newUser,
  });
};

// editando user

export const updateUser = (req: Request, res: Response): void => {
  const userId = Number(req.params.id);
  const userIndex = db.users.findIndex((u:User) => u.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: "Usuario nao encontrado" });
  }

  const { name, email } = req.body as CreateUserBody;

  if (!name || !email) {
    res.status(400).json({ error: "Nome e emails são obrigatório" });
  }

  db.users[userIndex] = {
    id: userId,
    name,
    email,
  };

 res.json({
    message: "Usuario atualizado",
  });
};

export const deleteUser = (req:Request, res:Response):void => {
  const userId = Number(req.params.id);
  const userIndex = db.users.findIndex((u:User) => u.id === userId);

  if (userIndex === -1) {
     res.status(404).send();
  }

  db.users.splice(userIndex, 1);
 res.json({ message: "Usuario exluido com sucesso" });
};


import * as db from '../data/database.js'
import { Request, Response } from "express";
import { CreateProductBody } from "../types/index.js";
import { getNextProductId } from "../data/database.js"



export const getProducts = (_:Request, res:Response):  void => {
   res.send(db.products);
};

export const getProductById = (req: Request, res: Response): void => {
  const productId = Number(req.params.id);
  const product = db.products.find((p) => p.id === productId);

  if (!product) {
     res.status(404).json({ error: "Produto não encontrado" });
  }
 res.json(product);
};

// criar produtos

export const create = (req: Request, res: Response): void =>  {
  const { name, price } = req.body as CreateProductBody;
  if (!name || price === undefined) {
    res.status(400).json({ error: "Nome e preço são obrigatórios" });
  }
  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
     res.status(400).json({ error: "Preço deve ser um número positivo" });
  }
  const newProduct = {
    id: getNextProductId(),
    name,
    price: numericPrice,
  };
  db.products.push(newProduct);

   res.json({
    message: "Produto criado com sucesso",
    product: newProduct,
  });
};

//put
export const update = (req: Request, res: Response): void => {
  const productId = Number(req.params.id);
  const productIndex = db.products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    res.status(404).json({ error: "Produto não encontrado" });
  }

  const { name, price } = req.body as CreateProductBody;

  if (!name || price === undefined) {
    res.status(400).json({ error: "Nome e preço são obrigatórios" });
  }

  const numericPrice = Number(price);

  if (isNaN(numericPrice) || numericPrice < 0) {
   res.status(400).json({ error: "Preço deve ser um número positivo" });
  }

  db.products[productIndex] = {
    id: productId,
    name,
    price: numericPrice,
  };

 res.json({
    message: "Produto atualizado com sucesso",
    product: db.products[productIndex],
  });
};

// delete

export const remove = (req: Request, res: Response): void => {
  const productId = Number(req.params.id);
  const productIndex = db.products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    res.status(204).send();
  }
  db.products.splice(productIndex, 1);
   res.json({ message: "Produto deletado com sucesso" });
};



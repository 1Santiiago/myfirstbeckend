import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getProducts = async (_: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error ao buscar produtos" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ error: "Produto nao encontrado" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error ao buscar produtos" });
  }
};

// criar produtos

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price } = req.body;
    const prod = await Product.create({ name, price });
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ error: "Error ao criar produtos" });
  }
};

//put
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price } = req.body;
    const prod = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
      },
      { returnDocument: "after" },
    );
    if (!prod) {
      res.status(404).json({ error: "Produto nao encontrado" });
      return;
    }
    res.json(prod);
  } catch (error) {
    res.status(404).json({ error: "Produto não encontrado" });
  }
};

// delete

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id)
    if(!prod){
       res.status(404).json({ error: "Produto não encontrado" });
       return
    }
    res.status(204).send()
  } catch (error) {
     res.status(500).json({ error: "Erro ao deletar produto" });
  }
  
};

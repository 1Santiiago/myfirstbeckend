import { Router } from "express";
import {
  create,
  getProductById,
  getProducts,
  remove,
  update,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     description: Retorna uma lista com todos os produtos cadastrados.
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get("/", authenticate, getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Products]
 *     description: Retorna um produto específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", authenticate, getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Products]
 *     description: Adiciona um novo produto ao sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Notebook Dell
 *               price:
 *                 type: number
 *                 example: 4500
 *               description:
 *                 type: string
 *                 example: Notebook para desenvolvimento
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authenticate, create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar um produto
 *     tags: [Products]
 *     description: Atualiza os dados de um produto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Notebook Gamer
 *               price:
 *                 type: number
 *                 example: 5200
 *               description:
 *                 type: string
 *                 example: Notebook gamer atualizado
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:id", authenticate, update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remover um produto
 *     tags: [Products]
 *     description: Remove um produto do sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", authenticate, remove);

export default router;

import { Router } from "express";
import { create, getProductById, getProducts, remove, update } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", create);
router.put("/:id", update);
router.delete('/:id', remove)


export default router
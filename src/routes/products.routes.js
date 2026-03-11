const { Router } = require("express");
const {
  getProducts,
  getProductById,
  create,
  remove,
  update,
} = require("../controllers/product.controller");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", create);
router.put("/:id", update);


module.exports = router;
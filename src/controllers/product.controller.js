const db = require("../data/database");

const getProducts = (_, res) => {
  return res.send(db.products);
};

const getProductById = (req, res) => {
  const productId = Number(req.params.id);
  const product = db.products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  return res.json(product);
};

// criar produtos

const create = (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Nome e preço são obrigatórios" });
  }
  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: "Preço deve ser um número positivo" });
  }
  const newProduct = {
    id: db.nextProductId++,
    name,
    price: numericPrice,
  };
  db.products.push(newProduct);

  return res.json({
    message: "Produto criado com sucesso",
    product: newProduct,
  });
};

//put
const update = (req, res) => {
  const productId = Number(req.params.id);
  const productIndex = db.products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: "Nome e preço são obrigatórios" });
  }

  const numericPrice = Number(price);

  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: "Preço deve ser um número positivo" });
  }

  db.products[productIndex] = {
    id: productId,
    name,
    price: numericPrice,
  };

  return res.json({
    message: "Produto atualizado com sucesso",
    product: db.products[productIndex],
  });
};

// delete

const remove = (req, res) => {
  const productId = Number(req.params.id);
  const productIndex = db.products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(204).send();
  }
  db.products.splice(productIndex, 1);
  return res.json({ message: "Produto deletado com sucesso" });
};

module.exports = { getProducts, getProductById, create, update, remove };

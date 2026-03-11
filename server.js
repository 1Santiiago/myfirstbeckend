const express = require("express");
const productRoutes = require("./src/routes/products.routes");
const usersRoutes = require("./src/routes/users.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

// rotas por entidade
app.use("/products", productRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
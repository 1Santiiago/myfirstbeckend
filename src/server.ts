import  express  from "express";
import  userRoutes  from "./routes/users.routes";
import  productRoutes  from "./routes/products.routes";
const app = express();
const PORT = 3000;

app.use(express.json());

// rotas por entidade
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
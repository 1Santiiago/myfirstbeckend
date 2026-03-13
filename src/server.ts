import "dotenv/config"
import  express  from "express";
import  userRoutes  from "./routes/users.routes";
import  productRoutes  from "./routes/products.routes";
import authRoutes from "./routes/auth.routes"
import { connectDB } from "./data/connections";
import path from "path"

import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My First Backend",
      version: "1.0.0",
      description: "Documentação da API"
    },
    servers: [
      { url: "http://localhost:3000" }
    ]
  },
  apis: [path.join(__dirname, "./routes/*.ts")]
}
const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const PORT = 3000;

app.use(express.json());

// rotas por entidade
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});


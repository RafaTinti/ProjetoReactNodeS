import userRoutes from "./routes/users.js"
import produtosRoutes from "./routes/produtos.js"
import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//ROTAS

app.use("/", userRoutes)
//rotas de produtos
app.use("/produtos", produtosRoutes);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
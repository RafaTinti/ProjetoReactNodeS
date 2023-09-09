import produtosRoutes from "./routes/produtos.js"
import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//ROTAS

//rotas de produtos
app.use("/produtos", produtosRoutes);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
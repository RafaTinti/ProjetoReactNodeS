import express from "express";
import { validaArquivo, updateProdutos } from "../controllers/produtos.js";

const router = express.Router();

//Rota de validacao do arquivo 

router.post('/', validaArquivo);

//rota de atualizacao do preços
router.post('/update', updateProdutos)

export default router;
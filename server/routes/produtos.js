import express from "express";
import { validaArquivo } from "../controllers/produtos.js";

const router = express.Router();

//Rota de validacao do arquivo 

router.post('/', validaArquivo);

//rota de atualizacao do preços


export default router;
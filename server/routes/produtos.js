import express from "express";
import { getProdutos, validaArquivo } from "../controllers/produtos";

const router = express.Router();

//rota de listagem

router.get('/', getProdutos);

//Rota de validacao do arquivo 

router.post('/', validaArquivo);

//rota de atualizacao do preços


export default router;
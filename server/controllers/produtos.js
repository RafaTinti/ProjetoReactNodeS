import { connection } from "../db.js";

// Devolve lista com todos os produtos na tabela products (get)
export const getProdutos = (req, res) => {
    const q = "SELECT * from products";

    connection.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
}

// Valida informações do arquivo do usuário e retorna lista para ser exibida com possiveis erros (post)

export const validaArquivo = (req, res) => {


    return res.status(200);
}

// Atualiza banco com as informações validadas (patch)



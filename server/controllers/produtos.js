import { connection } from "../db.js";

// Valida informações do arquivo do usuário e retorna lista para ser exibida com possiveis erros (post)

export const validaArquivo = (req, res) => {
    try {
        const tabelaPrecosNovos = req.body;
        tabelaPrecosNovos.forEach(async e => {
            const q = `SELECT pr.code as pr_code, pr.name as pr_name, pr.cost_price as pr_cost, pr.sales_price as pr_sales,
                       pa.id, pa.pack_id, pa.product_id, pa.qty,
                       pr2.code as pr2_code, pr2.name as pr2_name, pr2.cost_price as pr2_cost, pr2.sales_price as pr2_sales
                       FROM products as pr
                       LEFT JOIN packs as pa
                       ON pr.code = pa.pack_id
                       LEFT JOIN products as pr2
                       on pa.product_id = pr2.code
                       WHERE pr.code = ?`;

            connection.query(q, e.product_code, (error, data) => {
                if (error){
                    return res.json(error);
                }
                else{
                    console.log(data);
                }
                // return res.status(200).json("Usuário deletado com sucesso.");
            });
        });

        // return res.status(200);
    } catch (err) {
        console.log(err.message)
    }
}

// Atualiza banco com as informações validadas (patch)



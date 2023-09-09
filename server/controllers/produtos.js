import { connection } from "../db.js";
import groupBy from "core-js/actual/array/group-by.js";

// Valida informações do arquivo do usuário e retorna lista para ser exibida com possiveis erros (post)

export const validaArquivo = (req, res) => {
    try {
        const tabelaPrecosNovos = req.body;
        const q = `SELECT pr.code as pr_code, pr.name as pr_name, pr.cost_price as pr_cost, pr.sales_price as pr_sales,
                   pa.id, pa.pack_id, pa.product_id, pa.qty,
                   pr2.code as pr2_code, pr2.name as pr2_name, pr2.cost_price as pr2_cost, pr2.sales_price as pr2_sales,
                   CASE 
					  WHEN EXISTS (SELECT 1 FROM packs WHERE packs.product_id = pr.code) 
                      THEN (SELECT packs.pack_id FROM packs WHERE packs.product_id = pr.code)
                      ELSE false
				   END AS in_pack
                   FROM products as pr
                   LEFT JOIN packs as pa
                   ON pr.code = pa.pack_id
                   LEFT JOIN products as pr2
                   on pa.product_id = pr2.code`;

        //faz a consulta no banco
        connection.query(q, (error, data) => {
            if (error){
                return res.json(error);
            }
            else{
                const listaModificacao = [];
                // console.log(data);
                // agrupa dados por codigo do produto (para pacotes com mais de um prouto)
                data = data.groupBy((e) => e.pr_code);
                // return res.status(200).json(data);
                console.log(tabelaPrecosNovos);

                // percorre os elementos da tabela de atualizacão de preços
                for(let e of tabelaPrecosNovos){
                    // objeto que será mandando de volta para o client
                    let temp = {
                        codigo: e.product_code, 
                        nome: null, 
                        preco_atual: null,
                        preco_novo: Number(e.new_price).toFixed(2),
                        erro: "",
                        valido: true,
                    }

                    // verifica se os campos estão preenchidos
                    if (!e.product_code || !e.new_price){
                        temp.erro = "Campos não preenchidos. ";
                        temp.valido = false;
                        listaModificacao.push(temp);
                        continue;
                    }
                    // verifica se preço novo e válido
                    if (isNaN(Number(e.new_price))){
                        temp.erro = "Preço informado inválido. ";
                        temp.valido = false;
                        listaModificacao.push(temp);
                        continue;
                    }

                    // verifica se produto existe no banco
                    const entry = data[`${e.product_code}`];

                    // produto não existe
                    if(!entry){
                        temp.erro = "Codigo do produto informado não existe. ";
                        temp.valido = false;
                        listaModificacao.push(temp);
                        continue;
                    }
                    // produto existe
                    else{
                        // novo preço menor que custo
                        if(Number(e.new_price) < Number(entry[0].pr_cost)){
                            temp.erro += "Novo preço abaixo do preço de custo. ";
                            temp.valido = false;
                        }

                        // aumento de mais de 10%
                        if (Number(e.new_price) > Number(entry[0].pr_sales)*1.1){
                            temp.erro += "Aumento superior a 10% no preço de venda. ";
                            temp.valido = false;
                        }

                        // reducao de mais de 10%
                        if (Number(e.new_price) < Number(entry[0].pr_sales)*0.9){
                            temp.erro += "Redução superior a 10% no preço de venda. ";
                            temp.valido = false;
                        }

                        // checa se o item faz parte de um pacote e se sim se o pacote foi informado no arquivo
                        if(entry[0].in_pack){
                            if (!tabelaPrecosNovos.some((e) => e.product_code == entry[0].in_pack)){
                                temp.erro += "Existem pacotes que contem esse produto que não estão no arquivo. ";
                                temp.valido = false;
                            }
                        }
                        // checa se pacote e tem que fazer atualizacao em outro produto
                        if(entry[0].id){
                            let composicao = [];
                            for(let element of entry){
                                let temp2 = {
                                    code: element.product_id,
                                    qty: element.qty,
                                    old_price: element.pr2_sales,
                                    new_priceObj: tabelaPrecosNovos.find( (e) => e.product_code == element.product_id),
                                };
                                composicao.push(temp2);
                            }
                            //soma as o preco novo das composicao do pacote
                            const somaComposicaoNovo = composicao.reduce((accumulator, element) => {
                                if (!element.new_priceObj){// se nao tem preco novo para produto do pacote
                                    temp.erro += `Novo preço para produto código ${element.code} não informado. `;
                                    temp.valido = false;
                                    return -10000000000;
                                }
                                
                                return accumulator + (element.qty * Number(element.new_priceObj.new_price))
                            }, 0)

                            if(somaComposicaoNovo > 0 && somaComposicaoNovo != Number(e.new_price)){
                                temp.erro += `Soma dos preços novos dos produtos que compõem esse pacote ${somaComposicaoNovo} diferente do preço novo do pacote informado ${Number(e.new_price)}.`;
                                temp.valido = false;
                            }
                        }
                        // adiciona objeto no array de resposta
                        temp.nome = entry[0].pr_name;
                        temp.preco_atual = entry[0].pr_sales;
                        listaModificacao.push(temp);
                    }
                }

                return res.status(200).json(listaModificacao);
            }
        });
    } catch (err) {
        console.error(err.message)
    }
}

// Atualiza banco com as informações validadas (patch)

export const updateProdutos = (req, res) => {
    try {
        // console.log(req.body.dadosValidados);
        let q = "";
        for(let d of req.body.dadosValidados){
            console.log(d);
            q += `UPDATE products SET sales_price = ${d.preco_novo} WHERE code = ${d.codigo}; `;
        }

        console.log(q);

        connection.query(q, (err) => {
            if (err) return res.json(err);
      
            return res.status(200).json("Usuário atualizado com sucesso.");
        });
    } catch (error) {
        console.error(error.message);
    }

}

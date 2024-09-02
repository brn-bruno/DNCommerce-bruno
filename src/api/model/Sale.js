import db from '../../database/db.js';
let hoje = new Date();

class Sale {
    async list() {
        try {
            const res = await db.promise().query(`select * from TBL_VENDA`);

            return { status: 200, response: res[0] };

        } catch (error) {
            return { status: 500, response: `Erro ao obter vendas do banco de dados! Detalhes: ${error}` };

        }
    }

    async listById(id) {
        try {
            const res = await db.promise().query(`select * from TBL_VENDA where id = ${id}`);

            return { status: 200, response: res[0][0] };
            
        } catch (error) {
            return { status: 404, response: `Erro ao obter venda do banco de dados! Detalhes: ${error}` }
            
        }
    }

    async create(item) {
        const res_quantidade_atual = await db.promise().query(`SELECT QUANTIDADE
                                                                FROM TBL_ESTOQUE
                                                                WHERE PRODUTO_ID = ${item.produto_id}`);
        let quantidade_atual = res_quantidade_atual[0][0].QUANTIDADE;
        let quantidade_nova = quantidade_atual - item.quantidade;

        if (quantidade_atual == 0) {
            return { status: 401, response: `Sem estoque do produto!` };
            
        } else if (quantidade_nova < 0) {
            return { status: 401, response: `Quantidade requisitada maior que o estoque disponível!` };

        } else {
            try {
                const res_valor_produto = await db.promise().query(`    SELECT PRECO
                                                                        FROM TBL_PRODUTO
                                                                        WHERE ID = ${item.produto_id}`);
                let valor_produto = res_valor_produto[0][0].PRECO;

                await db.promise().query(`  insert into TBL_PEDIDO (ID, CLIENTE_ID, PRODUTO_ID, QUANTIDADE, VALOR_TOTAL, DATA)
                                            values (${item.pedido_id}, ${item.cliente_id}, ${item.produto_id}, ${item.quantidade}, ${(valor_produto * item.quantidade)}, ${item.data})`);
                                            
                const res_valor_total_pedido = await db.promise().query(`   SELECT SUM(VALOR_TOTAL) AS VALOR_TOTAL
                                                                            FROM TBL_PEDIDO
                                                                            WHERE ID = ${item.pedido_id}`);
                let valor_total_pedido = res_valor_total_pedido[0][0].VALOR_TOTAL;

                const valor_total_venda = (Number(valor_total_pedido) + Number(item.valor_frete));

                await db.promise().query(`  insert into TBL_VENDA (PEDIDO_ID, FORMA_PAGTO_ID, VALOR_FRETE, VALOR_TOTAL, CUPOM, DATA)
                                            values (${item.pedido_id}, ${item.forma_pagto_id}, ${item.valor_frete}, ${valor_total_venda}, ${item.cupom}, ${item.data})`);

                await db.promise().query(`  update TBL_ESTOQUE
                                            set QUANTIDADE = ${quantidade_nova}
                                            where PRODUTO_ID = ${item.produto_id}`);                
                                        
                return { status: 201, response: `Pedido e venda criados com sucesso!` };
            
            } catch (error) {
                return {status: 406, response: `Falha ao cadastrar pedido ou venda! Detalhes: ${error}`};
    
            }

        }
        
    }

    async delete(id) {
        try {
            const res_pedido_id = await db.promise().query(`   select PEDIDO_ID
                                                               from TBL_VENDA
                                                               where ID = ${id}`);
            let pedido_id = res_pedido_id[0][0].PEDIDO_ID;

            await db.promise().query(`  update TBL_ESTOQUE E
                                            inner join TBL_PEDIDO P on P.PRODUTO_ID = E.PRODUTO_ID
                                        set E.QUANTIDADE = E.QUANTIDADE + P.QUANTIDADE
                                        where P.ID = ${pedido_id}`);

            await db.promise().query(`delete from TBL_VENDA where id = ${id}`);
            const res = await db.promise().query(`delete from TBL_PEDIDO where id = ${pedido_id}`); 

            return { status: 202, response: `Venda e pedido removido com sucesso!` };
            
        } catch (error) {
            return { status: 404, response: `Erro ao excluir Venda ou Pedido do banco de dados! Detalhes: ${error}` }
            
        }
    }

}

export default Sale;
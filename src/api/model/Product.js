import db from '../../database/db.js';

class Product {
    async list() {
        try {
            const res = await db.promise().query(`select * from TBL_PRODUTO`);

            return { status: 200, response: res[0] };

        } catch (error) {
            return { status: 500, response: `Erro ao obter produtos do banco de dados! Detalhes: ${error}` };

        }
    }

    async listById(id) {
        try {
            const res = await db.promise().query(`select * from TBL_PRODUTO where id = ${id}`);

            return { status: 200, response: res[0][0] };
            
        } catch (error) {
            return { status: 404, response: `Erro ao obter produtos do banco de dados! Detalhes: ${error}` }
            
        }
    }

    async create(item) {
        try {
            await db.promise().query(`  insert into TBL_PRODUTO (NOME, PRECO, PESO_LIQUIDO, UNID_MEDIDA_PESO_LIQ, MARCA_ID)
                                        values ('${item.nome}', ${item.preco}, ${item.peso_liquido}, '${item.unid_medida_peso_liq}', ${item.marca_id})`);
                                        
            try {
                const res_select_id = await db.promise().query(`SELECT MAX(ID) as ID
                                                                FROM TBL_PRODUTO
                                                                WHERE NOME = '${item.nome}'
                                                                    AND PRECO = ${item.preco}
                                                                    AND PESO_LIQUIDO = ${item.peso_liquido}
                                                                    AND UNID_MEDIDA_PESO_LIQ = '${item.unid_medida_peso_liq}'
                                                                    AND MARCA_ID = ${item.marca_id} `);
    
                await db.promise().query(`   insert TBL_ESTOQUE (PRODUTO_ID, QUANTIDADE)
                                                values (${res_select_id[0][0].ID}, ${item.quantidade_estoque})`);
                                            
                return { status: 201, response: `Criado o produto e o estoque para o ID ${res_select_id[0][0].ID} - ${item.nome}` };
            
            } catch (error) {
                return {status: 406, response: `Falha ao cadastrar o estoque do produto! Detalhes: ${error}`};
    
            }
        
        } catch (error) {
            return {status: 406, response: `Falha ao cadastrar o produto! Detalhes: ${error}`};

        }
    }

    async update(item, id) {
        try {
            const res = await db.promise().query(`  update TBL_PRODUTO set NOME = '${item.nome}'
                                                                            , PRECO = ${item.preco}
                                                                            , PESO_LIQUIDO = ${item.peso_liquido}
                                                                            , UNID_MEDIDA_PESO_LIQ = '${item.unid_medida_peso_liq}'
                                                                            , MARCA_ID = ${item.marca_id}
                                                    where id = ${id}`);

            return { status: 202, response: `Produto de ID ${id} atualizado com sucesso!` };
            
        } catch (error) {
            return { status: 404, response: `Erro ao atualizar o produto! Detalhes: ${error}` }
            
        }
    }

    async delete(id) {
        try {
            const res = await db.promise().query(`delete from TBL_PRODUTO where id = ${id}`);

            return { status: 202, response: `Produto removido com sucesso!` };
            
        } catch (error) {
            return { status: 404, response: `Erro excluir produto do banco de dados! Detalhes: ${error}` }
            
        }
    }
}

export default Product;
import { Client } from 'pg';
import { IProduto, IEstabelecimento } from './interfaces';

const pg_conn = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'pass',
    port: 5432
}

export class PostgresQuerys {

    async createTable(): Promise<void> {
        const client: Client = new Client(pg_conn);
    
        await client.connect();
    
        await client.query(`CREATE TABLE estabelecimento(
            id_estabelecimento SERIAL PRIMARY KEY UNIQUE,
            nome VARCHAR NOT NULL,
            cnpj BIGINT NOT NULL,
            bairro VARCHAR NOT NULL,
            cidade VARCHAR NOT NULL
        );`)
        
        console.log("Tabela estabelecimento criada")

        await client.query(`CREATE TABLE produto(
            id_produto SERIAL PRIMARY KEY UNIQUE,
            nome VARCHAR NOT NULL,
            categoria VARCHAR NOT NULL
        );`)

        console.log("Tabela produto criada")

        await client.query(`CREATE TABLE estabelecimento_produto(
            fk_id_estabelecimento INTEGER NOT NULL,
            fk_id_produto INTEGER NOT NULL
        );`)

        console.log("Tabela estabelecimento_produto criada")

        await client.query(`ALTER TABLE estabelecimento_produto ADD CONSTRAINT FK_estabelecimento_produto_1
        FOREIGN KEY (fk_id_estabelecimento)
        REFERENCES estabelecimento (id_estabelecimento);`)

        console.log("Tabela chave estrangeira estabelecimento criada")

        await client.query(`ALTER TABLE estabelecimento_produto ADD CONSTRAINT FK_estabelecimento_produto_2
        FOREIGN KEY (fk_id_produto)
        REFERENCES produto (id_produto);`)

        console.log("Tabela chave estrangeira produto criada")
    
        await client.end();
        
    }
    
    async dropTable() {
        const client: Client = new Client(pg_conn);

        await client.connect();
        await client.query('DROP TABLE IF EXISTS produto CASCADE');
        await client.query('DROP TABLE IF EXISTS estabelecimento CASCADE');
        await client.query('DROP TABLE IF EXISTS estabelecimento_produto CASCADE');
        await client.end()
    
        console.log ("Tabelas removidas");
    }

    async insertTable( estabelecimentos: IEstabelecimento[], produtos: IProduto []) {

        const client: Client = new Client(pg_conn);

        const queryEstabelecimento = "INSERT INTO estabelecimento (nome, cnpj, bairro, cidade) VALUES($1, $2, $3, $4);";
        const queryProduto = "INSERT INTO produto (nome, categoria) VALUES($1, $2);";
        const queryEstaProd = "INSERT INTO estabelecimento_produto (fk_id_estabelecimento, fk_id_produto) VALUES($1, $2);";

        const selectEstabelecimento = "SELECT id_estabelecimento FROM estabelecimento WHERE nome ILIKE $1 and cnpj = $2 and bairro ILIKE $3 and cidade ILIKE $4;";
        const selectEstabelecimentoNome = "SELECT id_estabelecimento FROM estabelecimento WHERE nome ILIKE $1;";
        const selectProduto = "SELECT id_produto FROM produto WHERE nome ILIKE $1 and categoria ILIKE $2;";

        await client.connect();
        
        for (const estabelecimento of estabelecimentos) {
            try {
                var findEstabelecimento = await client.query(selectEstabelecimento, [estabelecimento.nome, estabelecimento.cnpj, estabelecimento.bairro, estabelecimento.cidade]);
                
                if (findEstabelecimento.rowCount === 0) {
                    await client.query(queryEstabelecimento, [estabelecimento.nome, estabelecimento.cnpj, estabelecimento.bairro, estabelecimento.cidade]);
                }
            } catch (error) {
                throw "Erro ao inserir estabelecimento" + error;
            }
        }

        console.log("Dados inseridos estabelecimentos");

        for (const produto of produtos) {
            try {
                var findProduto = await client.query(selectProduto, [produto.nome, produto.categoria])
                
                if (findProduto.rowCount === 0) {
                    await client.query(queryProduto, [produto.nome, produto.categoria]);
                }
            } catch (error) {
                throw "Erro ao inserir produto" + error;
            }
        }

        console.log("Dados inseridos produtos.");

        for (const produto of produtos) {
            
            try {
                var findEstabelecimento = await client.query(selectEstabelecimentoNome, [produto.estabelecimento]);
                var findProdutos = await client.query(selectProduto, [produto.nome, produto.categoria])
                
                await client.query(queryEstaProd, [findEstabelecimento.rows[0].id_estabelecimento, findProdutos.rows[0].id_produto])

            } catch (error) {
                throw "Erro ao inserir em estabelecimetno_produto" + error;
                
            }
        }

        console.log("Dados inseridos estabelecimento_Produtos.");
        
        
        await client.end()

        console.log ("Insert finalizado.");
        
    }
}
CREATE TABLE estabelecimento(
    id_estabelecimento INTEGER PRIMARY KEY UNIQUE,
    nome VARCHAR,
    cnpj INTEGER,
    bairro VARCHAR,
    cidade VARCHAR
);

CREATE TABLE produto(
    id_produto INTEGER PRIMARY KEY UNIQUE,
    nome VARCHAR,
    categoria VARCHAR
);

CREATE TABLE estabelecimento_produto(
    fk_estabelecimento_id_estabelecimento INTEGER,
    fk_produto_id_produto INTEGER
);

ALTER TABLE estabelecimento_produto ADD CONSTRAINT FK_estabelecimento_produto_1
    FOREIGN KEY (fk_estabelecimento_id_estabelecimento)
    REFERENCES estabelecimento (id_estabelecimento);

ALTER TABLE estabelecimento_produto ADD CONSTRAINT FK_estabelecimento_produto_2
    FOREIGN KEY (fk_produto_id_produto)
    REFERENCES produto (id_produto);

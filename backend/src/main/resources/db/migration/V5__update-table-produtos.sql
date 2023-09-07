DROP TABLE fotos_produto, avaliacao_produto, produto ;
CREATE TABLE produto(
	id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR (200),
    descricao_detalhada_produto VARCHAR (200),
    preco_produto DECIMAL (18, 2),
    qtd_estoque INT,
    ativo_inativo ENUM ('ATIVO', 'INATIVO')
);

CREATE TABLE avaliacao_produto (
	id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_produto BIGINT NOT NULL,
    avaliacao DOUBLE,
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);

CREATE TABLE fotos_produto (
	id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_produto BIGINT NOT NULL,
    nome_img VARCHAR(200) NOT NULL,
    caminho_img VARCHAR(200) NOT NULL,
    flag_img CHAR,
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);

INSERT INTO produto (nome_produto, descricao_detalhada_produto, preco_produto, qtd_estoque, ativo_inativo)
			VALUES ('Placa de Vídeo RTX 4070 TI', 'Placa de Vídeo RTX 4070 Ti Gigabyte - GV-N407TGAMING OC-12GD' , 5889.99 , 8 , 'ATIVO');
INSERT INTO avaliacao_produto (id_produto, avaliacao)
			VALUES (1, 4.5), (1 , 5) ;
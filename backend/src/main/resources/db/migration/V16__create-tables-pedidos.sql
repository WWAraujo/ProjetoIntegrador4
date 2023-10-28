CREATE TABLE dados_pedidos (
	id bigint auto_increment,
	primary key (id),
	id_cliente bigint NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    nome_cliente VARCHAR (100) NOT NULL,
    data_compra VARCHAR (20) NOT NULL,
    prazo_entrega VARCHAR (10) NOT NULL,
    valor_entrega DECIMAL (18, 2) NOT NULL,
    valor_total DECIMAL (18, 2) NOT NULL,
    forma_pagamento ENUM ('BOLETO', 'CARTÃO CREDITO', 'CARTÃO DÉBITO', 'PIX') NOT NULL,
    qtd_parcelas INTEGER ,
    cep VARCHAR (9) NOT NULL,
    logradouro VARCHAR (100) NOT NULL,
    numero VARCHAR (10),
    complemento VARCHAR (100),
    bairro VARCHAR (50) NOT NULL,
    cidade VARCHAR (50) NOT NULL,
    uf VARCHAR (2) NOT NULL
  );

CREATE TABLE lista_produtos_pedido (
	id BIGINT AUTO_INCREMENT,
	PRIMARY KEY (id),
	id_pedido BIGINT NOT NULL,
	id_produto BIGINT NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produto(id),
    quantidade INTEGER ,
    valor_unidade DECIMAL (18, 2)
  );
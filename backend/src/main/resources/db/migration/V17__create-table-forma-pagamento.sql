CREATE TABLE forma_pagamento (
	id BIGINT AUTO_INCREMENT,
	PRIMARY KEY (id),
	id_pedido BIGINT NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES dados_pedidos(id),
    forma_pagamento ENUM ('BOLETO', 'CARTÃO CREDITO', 'CARTÃO DÉBITO', 'PIX') NOT NULL,
    valor_total DECIMAL (18, 2) NOT NULL,
    nome_cartao VARCHAR (100) ,
    numero_cartao VARCHAR (16) ,
    ccv_cartao VARCHAR (3) ,
    validade_cartao VARCHAR (15) ,
    quantidade_parcelas INTEGER ,
    valor_da_parcela DECIMAL (18, 2)
  );
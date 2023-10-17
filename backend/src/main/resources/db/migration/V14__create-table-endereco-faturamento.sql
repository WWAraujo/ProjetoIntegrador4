DROP TABLE IF EXISTS enderecoFaturamento;
CREATE TABLE enderecoFaturamento (
	id bigint not null,
    FOREIGN KEY (id) REFERENCES cliente(id),
    cep varchar(8)  not null,
    logradouro varchar(200)  not null,
    numero varchar(20)  not null,
	complemento varchar(200),
	bairro varchar(50)  not null,
	cidade varchar(50)  not null,
	uf varchar(2) not null
  );
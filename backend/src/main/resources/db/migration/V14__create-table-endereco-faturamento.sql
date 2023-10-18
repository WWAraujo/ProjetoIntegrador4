DROP TABLE IF EXISTS endereco_faturamento;
CREATE TABLE endereco_faturamento (
	id bigint not null auto_increment primary key,
    id_cliente bigint not null,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    cep varchar(8)  not null,
    logradouro varchar(200)  not null,
    numero varchar(20)  ,
	complemento varchar(200),
	bairro varchar(50)  not null,
	cidade varchar(50)  not null,
	uf varchar(2) not null
  );
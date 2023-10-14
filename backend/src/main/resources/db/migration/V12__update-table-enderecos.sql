ALTER TABLE enderecos ADD COLUMN enderecoPrincipal char (1);

ALTER TABLE enderecos MODIFY COLUMN cep varchar (8) not null;

ALTER TABLE enderecos MODIFY COLUMN numero varchar (10) not null;

ALTER TABLE cliente MODIFY COLUMN datanasc_cliente varchar (8) not null;
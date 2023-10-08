CREATE TABLE cliente(

    	    id BIGINT not null AUTO_INCREMENT PRIMARY KEY,
            nome_cliente varchar (100) not null,
            cpf_cliente int (11) not null,
            dataNasc_cliente int (8) not null,
            genero_cliente varchar (20) not null,
            telefone_cliente int (11) not null,
            email_cliente varchar (50) not null unique,
            senha_cliente varchar (50) not null
);
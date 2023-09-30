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

CREATE TABLE enderecos(

            id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            id_cliente BIGINT NOT NULL,
            cep INT (8) NOT NULL,
            logradouro VARCHAR (100) NOT NULL,
            numero INT (10) NOT NULL,
            complemento VARCHAR (100) NOT NULL,
            bairro VARCHAR (50) NOT NULL,
            cidade VARCHAR (50) NOT NULL,
            uf VARCHAR (2) NOT NULL,
            FOREIGN KEY (id_cliente) references cliente(id)
);
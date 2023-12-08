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
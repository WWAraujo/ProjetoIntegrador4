drop table LOGINS;

create table tipo_usuarios (
	id int NOT NULL AUTO_INCREMENT,
    tipo varchar(20),
    primary key(id)
	);

INSERT INTO tipo_usuarios (tipo)
VALUES ('ADMINISTRADOR'),
		('ESTOQUISTA'),
        ('CLIENTE');

create table login(
    id bigint not null auto_increment,
    nome_usuario varchar(100) not null,
    cpf_usuario varchar(11) not null,
    email_usuario varchar(50) not null unique,
    senha_usuario varchar(50) not null,
    tipo_usuario int not null,
    primary key (id),
    foreign key (tipo_usuario) references tipo_usuarios(id)
);
INSERT INTO login (nome_usuario, cpf_usuario, email_usuario, senha_usuario, tipo_usuario)
			VALUES ('admin', '12345678910', 'admin@admin.com', 'YWRtaW5TRU5BQzIwMjM=', 1);

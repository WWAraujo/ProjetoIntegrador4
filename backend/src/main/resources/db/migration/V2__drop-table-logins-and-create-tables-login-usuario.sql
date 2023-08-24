drop table LOGINS;

create table tipoUsuarios (
	id int NOT NULL AUTO_INCREMENT,
    tipo varchar(20),
    primary key(id)
	);

INSERT INTO tipoUsuarios (tipo)
VALUES ('ADMINISTRADOR'),
		('ESTOQUISTA'),
        ('CLIENTE');

create table login(
    id bigint not null auto_increment,
    nomeUsuario varchar(100) not null,
    cpfUsuario varchar(11) not null,
    emailUsuario varchar(50) not null unique,
    senhaUsuario varchar(50) not null,
    tipoUsuario int not null,
    primary key (id),
    foreign key (tipoUsuario) references tipoUsuarios(id)
);
INSERT INTO login (nomeUsuario, cpfUsuario, emailUsuario, senhaUsuario, tipoUsuario)
			VALUES ('admin', '12345678910', 'admin@admin', 'admin', 1);

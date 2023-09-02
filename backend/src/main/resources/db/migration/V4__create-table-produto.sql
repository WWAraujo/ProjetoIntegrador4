create table produto(
	id int not null auto_increment,
    nome_produto varchar (200),
    descricao_detalhada_produto varchar (200),
    preco_produto DECIMAL (18, 2),
    qtd_estoque int,
    ativo_inativo ENUM ('ATIVO', 'INATIVO'),
    primary key (id)
);

create table avaliacao_produto (
	id int not null auto_increment primary key,
    id_produto int not null,
    avaliacao double,
    foreign key (id_produto) references produto(id)
);

create table fotos_produto (
	id int not null auto_increment primary key,
    id_produto int not null,
    nome_img varchar(200) not null,
    caminho_img varchar(200) not null,
    flag_img char,
    foreign key (id_produto) references produto(id)
);

insert into produto (nome_produto, descricao_detalhada_produto, preco_produto, qtd_estoque, ativo_inativo)
			values ('Placa de Vídeo RTX 4070 TI', 'Placa de Vídeo RTX 4070 Ti Gigabyte - GV-N407TGAMING OC-12GD' , 5889.99 , 8 , 'ATIVO');
insert into avaliacao_produto (id_produto, avaliacao)
			values (1, 4.5), (1 , 5) ;
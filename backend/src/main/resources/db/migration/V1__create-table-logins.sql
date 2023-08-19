create table logins(

    id bigint not null auto_increment,
    usuario varchar(100) not null unique,
    senha varchar(100) not null,

    primary key(id)

);
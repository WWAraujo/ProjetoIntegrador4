ALTER TABLE login ADD ativo_inativo ENUM ('ATIVO', 'INATIVO');
update login set ativo_inativo = 'ATIVO' where id = 1;
ALTER TABLE dados_pedidos MODIFY COLUMN forma_pagamento varchar(20) not null;

ALTER TABLE forma_pagamento MODIFY COLUMN forma_pagamento varchar(20) not null;

ALTER TABLE dados_pedidos MODIFY COLUMN prazo_entrega varchar(20) not null;

ALTER TABLE dados_pedidos MODIFY COLUMN data_compra varchar (30) not null;
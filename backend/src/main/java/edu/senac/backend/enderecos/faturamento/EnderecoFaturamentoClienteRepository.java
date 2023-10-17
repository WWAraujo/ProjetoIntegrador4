package edu.senac.backend.enderecos.faturamento;

import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoFaturamentoClienteRepository extends JpaRepository<EnderecoFaturamentoClienteModel, Long> {
}

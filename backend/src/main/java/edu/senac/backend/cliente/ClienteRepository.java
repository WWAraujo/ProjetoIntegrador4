package edu.senac.backend.cliente;

import edu.senac.backend.usuario.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

public interface ClienteRepository extends JpaRepository<ClienteModel, Long> {

    Optional<ClienteModel> findByEmailCliente(String email);

    Optional<ClienteModel> findByCpfCliente(String email);

    @Query("SELECT l.id as id FROM Cliente l WHERE l.emailCliente = :usuario AND l.senhaCliente = :senha")
    LoginClienteResponse findIdAndTypeByEmailAndSenha(String usuario, String senha);

    @Modifying
    @Transactional
    @Query("DELETE FROM Enderecos end WHERE end.idCliente = :id")
    void deleteByEnderecosId(@Param("id") Long id);

}

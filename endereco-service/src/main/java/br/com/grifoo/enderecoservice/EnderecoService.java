package br.com.grifoo.enderecoservice;

import br.com.grifoo.enderecoservice.model.Endereco;

import java.util.List;

public interface EnderecoService {

    Endereco autalizarEndereco(String id, Endereco endereco);

    Endereco buscarPorId(String id);

    List<Endereco> buscarTodos();

    void deletarEndereco(String id, Endereco endereco);

    void salvarEndereco(Endereco endereco);
}

package br.com.grifoo.enderecoservice;

import br.com.grifoo.enderecoservice.exception.NotFoundException;
import br.com.grifoo.enderecoservice.model.Endereco;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoServiceImpl implements EnderecoService {

    @Autowired
    private EnderecoRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public Endereco autalizarEndereco(String id, Endereco endereco) {
        Optional<EnderecoEntity> enderecoEntity = repository.findById(id);

        if (!enderecoEntity.isPresent()) {
            throw new NotFoundException("Endereco não encontrado");
        }

        EnderecoEntity entity = objectMapper.convertValue(endereco, EnderecoEntity.class);
        repository.save(entity);

        return endereco;
    }

    @Override
    public Endereco buscarPorId(String id) {
        Optional<EnderecoEntity> enderecoEncontrado = repository.findById(id);

        if (!enderecoEncontrado.isPresent()) {
            throw new NotFoundException("Endereco não encontrado");
        }

        return objectMapper.convertValue(enderecoEncontrado, Endereco.class);
    }

    @Override
    public List<Endereco> buscarTodos() {
        return null;
    }

    @Override
    public void deletarEndereco(String id, Endereco endereco) {

    }

    @Override
    public void salvarEndereco(Endereco endereco) {

    }
}

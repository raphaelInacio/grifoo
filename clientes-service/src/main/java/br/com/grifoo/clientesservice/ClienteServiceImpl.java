package br.com.grifoo.clientesservice;

import br.com.grifoo.clientesservice.exception.NotContextException;
import br.com.grifoo.clientesservice.exception.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {

	private Logger logger = LoggerFactory.getLogger(ClienteServiceImpl.class);

	@Autowired
	private ClienteRepository repository;

	@Override
	public Cliente save(Cliente cliente) {
		logger.info("Criando um novo cliente", cliente);
		return repository.save(cliente);
	}

	@Override
	public void delete(String id) {
		logger.info("Removendo cliente", id);
		repository.deleteById(id);
	}

	@Override
	public List<Cliente> buscarTodos() throws NotContextException {
		logger.info("Buscando todos clientes...");
		List<Cliente> all = repository.findAll();
		if(all.isEmpty()){
			logger.info("Nenhum cliente encontrado!");
			throw new NotContextException("Nenhum cliente encontrado");
		}
		return all;
	}

	@Override
	public Cliente buscarPorId(String id) throws NotFoundException {
		logger.info("Recuperando cliente por id", id);
		Optional<Cliente> cliente = repository.findById(id);
		if (!cliente.isPresent()) {
			throw new NotFoundException("Cliente não encontrado");
		}
		return cliente.get();
	}

	@Override
	public Cliente atualizar(String id, Cliente updateCliente) throws NotFoundException {
		if (!repository.existsById(id)) {
			throw new NotFoundException("Cliente não encontrado");
		}
		return repository.save(updateCliente);
	}
}

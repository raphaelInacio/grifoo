package br.com.grifoo.clientesservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {

	@Autowired
	private ClienteRepository repository;

	@Override
	public Cliente save(Cliente cliente) {
		return repository.save(cliente);
	}

	@Override
	public void delete(String id) {
		repository.deleteById(id);
	}

	@Override
	public List<Cliente> buscarTodos() {
		return repository.findAll();
	}

	@Override
	public Cliente buscarPorId(String id) {
		Optional<Cliente> cliente = repository.findById(id);
		return cliente.get();
	}

	@Override
	public Cliente atualizar(String id, Cliente updatecliente) {
		Cliente cliente = repository.findById(id).get();
		cliente = updatecliente;
		repository.save(cliente);
		return cliente;
	}
}

package br.com.grifoo.clientesservice;

import java.util.List;

public interface ClienteService {

	Cliente save(Cliente cliente);

	void delete(String id);

	List<Cliente> buscarTodos();

	Cliente buscarPorId(String id);

	Cliente atualizar(String id, Cliente cliente);
}

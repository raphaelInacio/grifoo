package br.com.grifoo.clientesservice;

import br.com.grifoo.clientesservice.exception.NotContextException;
import br.com.grifoo.clientesservice.exception.NotFoundException;

import java.util.List;

public interface ClienteService {

	Cliente save(Cliente cliente) throws NotFoundException;

	void delete(String id) throws NotFoundException;

	List<Cliente> buscarTodos() throws NotContextException;

	Cliente buscarPorId(String id) throws NotFoundException;

	Cliente atualizar(String id, Cliente cliente) throws NotFoundException;
}

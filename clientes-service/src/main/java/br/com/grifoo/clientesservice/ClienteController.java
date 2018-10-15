package br.com.grifoo.clientesservice;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/clientes")
@Api(value = "grifoo", description = "Operações para gerenciamento de clientes")
public class ClienteController {

	@Autowired
	private ClienteService clienteService;

	@GetMapping
	@ApiOperation(value = "Listar todos os clientes", produces = "application/json")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados recuperados com sucesso"),
	})
	public List<Cliente> buscarTodosclientes() {
		return clienteService.buscarTodos();
	}

	@PostMapping
	@ApiOperation(value = "Salva um cliente", produces = "application/json")
	@ApiResponses(value = {
			@ApiResponse(code = 201, message = "Operação realizada com sucesso"),
			@ApiResponse(code = 400, message = "Dados invalidos")
	})
	public void save(@RequestBody @Valid Cliente cliente) {
		clienteService.save(cliente);
	}

	@GetMapping(value = "/{clienteId}", produces = "application/json")
	@ApiOperation(value = "Recuera um cliente por id")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Operação realizada com sucesso"),
			@ApiResponse(code = 400, message = "Dados invalidos"),
			@ApiResponse(code = 404, message = "Recurso não encontrado")
	})
	public Cliente buscarClientePorId(@PathVariable("id") String id) {
		return clienteService.buscarPorId(id);
	}

	@PutMapping(value = "/{id}", produces = "application/json")
	@ApiOperation(value = "Atualiza informações do cliente por id")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Operação realizada com sucesso"),
			@ApiResponse(code = 400, message = "Dados invalidos"),
			@ApiResponse(code = 404, message = "Recurso não encontrado")
	})
	public Cliente autalizarCliente(@RequestParam("id") String id, @RequestBody Cliente cliente) {
		return clienteService.atualizar(id, cliente);
	}

	@DeleteMapping(value = "/{id}", produces = "application/json")
	@ApiOperation(value = "Remove um cliente por id")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Operação realizada com sucesso"),
			@ApiResponse(code = 400, message = "Dados invalidos"),
			@ApiResponse(code = 404, message = "Recurso não encontrado")
	})
	public void deletarCliente(@RequestParam("id") String id, @RequestBody Cliente cliente) {
		clienteService.delete(id);
	}

}

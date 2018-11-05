package br.com.grifoo.clientesservice;

import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringRunner.class)
public class ClienteControllerTest extends AbstractIntegrationTest {

	private RestTemplate restTemplate = new RestTemplate();

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void buscarTodosclientes() throws Exception {
		ResponseEntity<Cliente> entity = restTemplate.getForEntity("http://localhost:8081/clientes", Cliente.class);
		Assert.assertEquals(HttpStatus.NO_CONTENT, entity.getStatusCode());
	}

	@Test
	public void save() {
	}

	@Test
	public void buscarClientePorId() {
	}

	@Test
	public void autalizarCliente() {
	}

	@Test
	public void deletarCliente() {
	}
}
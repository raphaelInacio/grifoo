package br.com.grifoo.clientesservice;

import org.junit.ClassRule;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.testcontainers.containers.GenericContainer;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(
		classes = ClientesServiceApplication.class,
		webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@PropertySource("classpath:application-test.properties")
public class AbstractIntegrationTest {
	@ClassRule
	public static GenericContainer mongo =
			new GenericContainer("mongo:3.4")
					.withExtraHost("mongodb", "127.0.0.1")
					.withExposedPorts(27017);
}

package br.com.grifoo.clientesservice;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "clientes")
public class Cliente {
	@Id
	public String id;
	public String nome;
	public String email;
	public String telefone;
}

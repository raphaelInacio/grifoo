package br.com.grifoo.clientesservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "clientes")
public class Cliente {
	@Id
	public String id;
	public String nome;
	public String email;
	public String telefone;
}

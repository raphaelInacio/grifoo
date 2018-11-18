package br.com.grifoo.enderecoservice;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@Document(collection = "endereco")
public class EnderecoEntity {

    @Id
    private String id;

    private String rua;

    private String complemento;

    private String cep;

    private BigDecimal numero;

    private String cidade;

    private String estado;
}

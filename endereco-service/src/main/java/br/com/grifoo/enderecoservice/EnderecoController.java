package br.com.grifoo.enderecoservice;

import br.com.grifoo.enderecoservice.controller.EnderecosApi;
import br.com.grifoo.enderecoservice.model.Endereco;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class EnderecoController implements EnderecosApi {

    @Autowired
    private EnderecoService enderecoService;

    public ResponseEntity<Endereco> autalizarEndereco(
            @ApiParam(value = "Id", required = true) @PathVariable("id") String id,
            @ApiParam(value = "endereco", required = true) @Valid @RequestBody Endereco endereco) {
        return new ResponseEntity<Endereco>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Endereco> buscarPorId(@ApiParam(value = "id", required = true) @PathVariable("id") String id) {
        return new ResponseEntity<Endereco>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<Endereco>> buscarTodos() {
        return new ResponseEntity<List<Endereco>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Void> deletarEndereco(@ApiParam(value = "id", required = true) @PathVariable("id") String id, @ApiParam(value = "endereco", required = true) @Valid @RequestBody Endereco endereco) {
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Void> salvarEndereco(@ApiParam(value = "endereco", required = true) @Valid @RequestBody Endereco endereco) {
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }
}

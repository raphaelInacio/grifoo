package br.com.grifoo.enderecoservice;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnderecoRepository extends MongoRepository<EnderecoEntity, String> {
}

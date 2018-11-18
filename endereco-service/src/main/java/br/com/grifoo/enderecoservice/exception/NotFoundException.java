package br.com.grifoo.enderecoservice.exception;


public class NotFoundException extends RuntimeException {
	public NotFoundException(String message) {
		super(message);
	}
}

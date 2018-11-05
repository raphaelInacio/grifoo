package br.com.grifoo.clientesservice.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

@Order(Ordered.HIGHEST_PRECEDENCE)
public class DefaultExceptionHandler extends DefaultHandlerExceptionResolver {

	@RequestMapping(produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler({NotFoundException.class})
	public @ResponseBody
	ResponseEntity<ResponseError> handleNotFoundException(Exception ex) {
		return new ResponseEntity<ResponseError>(new ResponseError(HttpStatus.NOT_FOUND, ex.getMessage()), HttpStatus.NOT_FOUND);
	}

	@RequestMapping(produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler({NotContextException.class})
	public @ResponseBody
	ResponseEntity<ResponseError> handleNotContentExceptiom(Exception ex) {
		return new ResponseEntity<ResponseError>(new ResponseError(HttpStatus.NO_CONTENT, ex.getMessage()), HttpStatus.NO_CONTENT);
	}
}

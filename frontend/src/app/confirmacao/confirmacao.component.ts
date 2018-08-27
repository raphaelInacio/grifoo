import { Evento } from '../evento/model/evento.model';
import Endereco from '../endereco/model/endereco.model';
import Cliente from '../cliente/model/cliente.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {

@Input() public cliente: Cliente
@Input() public endereco: Endereco
@Input() public evento: Evento
@Output() confirmarPedidoEmiter = new EventEmitter<Boolean>()

constructor() { }
ngOnInit() {}

  public confimarPedido():void{
    this.confirmarPedidoEmiter.emit(true)
  }

}

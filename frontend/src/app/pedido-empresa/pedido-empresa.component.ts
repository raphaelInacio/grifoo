import { tap } from 'rxjs/operators';
import { ClienteService } from './../cliente/services/cliente.service';
import { PedidoService } from './../pedido/service/pedido.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import Cliente from '../cliente/model/cliente.model';
import Pedido from '../pedido/model/pedido.model';

@Component({
  selector: 'app-pedido-empresa',
  templateUrl: './pedido-empresa.component.html',
  styleUrls: ['./pedido-empresa.component.css'],
  providers: [PedidoService, ClienteService]
})
export class PedidoEmpresaComponent implements OnInit {

  constructor(private pedidoService: PedidoService, private clienteService: ClienteService) { }

  public progresso: number = 0
  public titulo: String = "Solicitação de serviços para minha empresa"
  public progressoStyle:Object = {'width':'0%'}
  public pedidoEmpresa: boolean = true
  public sucesso: boolean = false

  @ViewChild('formulario') public formulario: NgForm

  ngOnInit() {
  }

  public salvarPedidoEmpresa(): void {

    let cliente: Cliente = new Cliente(
      this.formulario.form.value.nome, 
      this.formulario.form.value.email, 
      this.formulario.form.value.telefone)

    let pedido: Pedido = new Pedido()
    pedido.tipoPedido = 'EMPRESA'
    pedido.mensagem = this.formulario.form.value.mensagem
  
    this.clienteService
    .salvarCliente(cliente)
    .pipe(tap((clienteResponse: Cliente) => {
      
      cliente = clienteResponse
      
      let pedido: Pedido = new Pedido()
      pedido.clienteId = cliente._id
      
      this.pedidoService.salvarPedido(pedido)
        .pipe(tap((response: Pedido) => {
          console.log(`Pedido criado com sucesso: ${JSON.stringify(response)}`)
          pedido = response
        }))
        .subscribe()
        
        this.pedidoEmpresa = false
        this.sucesso = true
        this.atualizarProgresso('Sucesso')
    }))
    .subscribe()
    
    
  }
  atualizarProgresso(titulo:string){
    this.progresso = (this.progresso = 100)
    this.progressoStyle = {'width':`${this.progresso}%`}
    this.titulo = titulo
  }

}

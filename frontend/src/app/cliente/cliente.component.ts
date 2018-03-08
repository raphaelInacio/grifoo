import { Component, OnInit, Injectable, ViewChild, Output, EventEmitter } from '@angular/core';
import ClienteService from './services/cliente.service';
import Cliente from '../cliente/model/cliente.model';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService]
})

@Injectable()
export class ClienteComponent implements OnInit {

  @ViewChild('formulario') public formulario: NgForm
  private cliente: Cliente
  
  @Output() clienteSalvoEmiter = new EventEmitter<Cliente>();
  public clienteSalvo: boolean = false
  public editarCliente: boolean = false

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit() {
  }

  public salvarDadosPessoais(): void {
    let cliente: Cliente = new Cliente(this.formulario.form.value.nome, this.formulario.form.value.email, this.formulario.form.value.telefone)
    this.clienteService
      .salvarCliente(cliente)
      .pipe(tap((clienteResponse: Cliente) => {
        console.log(`cliente adicioado com sucesso: ${JSON.stringify(clienteResponse)}`)
        this.cliente = clienteResponse
        this.clienteSalvoEmiter.emit(clienteResponse)
      }))
      .subscribe()
  }

  public editarCiente():void{
    console.log("Clique realiado")
    this.clienteSalvo = false
  }
}

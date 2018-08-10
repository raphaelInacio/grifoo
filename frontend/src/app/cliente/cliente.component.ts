import { Component, OnInit, Injectable, ViewChild, Output, EventEmitter } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import Cliente from './model/cliente.model';
import {
  tap
} from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService],
})

@Injectable()
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService) {
  }

  @ViewChild('formulario') public formulario: NgForm
  @Output() clienteSalvoEmiter = new EventEmitter<Cliente>();

  public clienteSalvo: boolean = false
  private cliente: Cliente

  //Error messages
  public error: boolean = false
  public message: string = "Campos obrigatórios não preenchidos"
  public description: string = ""

  ngOnInit() {
  }

  public salvarDadosPessoais(): void {

    try {

      let cliente: Cliente = new Cliente(
        this.formulario.form.value.nome,
        this.formulario.form.value.email,
        this.formulario.form.value.telefone)

      this.clienteService
        .salvarCliente(cliente)
        .pipe(tap((clienteResponse: Cliente) => {
          this.cliente = clienteResponse
          this.clienteSalvoEmiter.emit(clienteResponse)
        }))
        .subscribe()

    } catch (error) {
      this.error = true
      this.description = error.message
    }

  }

}

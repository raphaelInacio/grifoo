import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnderecoService } from './service/endereco.service'
import  Endereco  from './model/endereco.model'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  providers: [EnderecoService]
})
export class EnderecoComponent implements OnInit {

  @ViewChild('formulario') public f: NgForm
  @Output() enderecoSalvoEmiter = new EventEmitter<Endereco>();
  private mostrarEndereco:boolean = false

  constructor(private enderecoService: EnderecoService) { }

  ngOnInit() {
  }

  public salvarLocalEvento(): void {
    
    let endereco: Endereco = new Endereco(
      this.f.form.value.endereco,
      this.f.form.value.numero,
      this.f.form.value.complemento,
      this.f.form.value.cep,
      this.f.form.value.bairro,
      this.f.form.value.cidade,
      this.f.form.value.estado)

      this.enderecoService.salvarEndereco(endereco)
      .pipe(tap((response: Endereco) => {
        console.log(`Endereco salvo com sucesso: ${JSON.stringify(response)}`)
        this.enderecoSalvoEmiter.emit(response)
      }))
      .subscribe()

    console.log(endereco)
  }
}

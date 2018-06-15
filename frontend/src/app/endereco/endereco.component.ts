import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnderecoService } from './service/endereco.service'
import Endereco from './model/endereco.model'
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
  private mostrarEndereco: boolean = false
  public endereco: Endereco;
  public mostrarEnderecoPorCep: boolean = false;
  public mostraMensagemErro: boolean = false;
  public messageErro: string = ''

  constructor(private enderecoService: EnderecoService) { }

  ngOnInit() {
  }

  public buscarEnderecoPorCep(cep: string): void {

    let cepFormatado = cep.replace("-", "")

    if (cepFormatado.length === 8) {
      console.log("event disparado: " + cepFormatado)
      this.enderecoService.buscarEnderecoPorCep(cepFormatado)
        .pipe(tap((response: any) => {
          console.log(`Resultado busca por cep: ${JSON.stringify(response)}`)

          this.endereco = new Endereco(
            response.logradouro,
            0,
            "",
            response.cep,
            response.bairro,
            response.localidade,
            response.uf);

          this.mostrarEnderecoPorCep = true;

        }))
        .subscribe()
    }

  }

  public salvarLocalEvento(): void {

    this.endereco.numero = this.f.form.value.numero
    this.endereco.complemento = this.f.form.value.complemento

    this.enderecoService.salvarEndereco(this.endereco)
      .pipe(tap((response: Endereco) => {
        console.log(`Endereco salvo com sucesso: ${JSON.stringify(response)}`)
        this.enderecoSalvoEmiter.emit(response)
      }))
      .subscribe()

    console.log(this.endereco)
  }
}

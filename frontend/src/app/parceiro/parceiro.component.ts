import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Parceiro from './model/parceiro.model';
import { ParceiroService } from './service/parceiro.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {

  constructor(private parceiroService: ParceiroService) { }

  @ViewChild('formulario') public f: NgForm
  public progresso: number = 0
  public titulo: String = "Cadastro de parceiros Grifoo"
  public progressoStyle:Object = {'width':'0%'}
  public sucesso:boolean = false
  public parceiroFormulario = true

  public perfilEmpresa: boolean = false
  public perfilProfissional: boolean = false
  public perfil: boolean = true
  public opcoes: Array<any> = ["SIM", "NAO"]
  public parceiro: Parceiro = new Parceiro()

  ngOnInit() {

  }

  public selecionarPerfil(perfilSelecionado: string): void {
    this.parceiro.tipo = perfilSelecionado.valueOf()
    this.perfil = false
    if (perfilSelecionado.valueOf() == 'PROFISSIONAL') {
      this.perfilProfissional = true
    } else {
      this.perfilEmpresa = true
    }
  }

  public salvarParceiro(): void {

    this.parceiro.cpfCnpj = this.f.form.value.cpfCnpj
    this.parceiro.descricao = this.f.form.value.descricao
    this.parceiro.documentacao = this.f.form.value.documentacao
    this.parceiro.email = this.f.form.value.email
    this.parceiro.mediaValorHora = this.f.form.value.valor
    this.parceiro.nome = this.f.form.value.nome
    this.parceiro.telefone = this.f.form.value.telefone

    this.parceiroService.salvarEndereco(this.parceiro)
      .pipe(tap((response: Parceiro) => {
        console.log(`Parceiro salvo com sucesso: ${JSON.stringify(response)}`)
        this.sucesso = true
        this.parceiroFormulario = false
      }))
      .subscribe()
  }

}

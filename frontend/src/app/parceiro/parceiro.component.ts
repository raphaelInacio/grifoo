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

  //Progress properties
  public progresso: number = 0
  public titulo: String = "Cadastro de parceiros Grifoo"
  public progressoStyle: Object = { 'width': '0%' }

  //Parceiros properties
  public sucesso: boolean = false
  public parceiroFormulario = true
  public perfilEmpresa: boolean = false
  public perfilProfissional: boolean = false
  public perfil: boolean = true
  public opcoes: Array<any> = ["SIM", "NAO"]
  public parceiro: Parceiro = new Parceiro()

  //Error messages
  public error: boolean = false
  public message: string = "Campos obrigatórios não preenchidos"
  public description: string = " "


  ngOnInit() {

  }

  public selecionarPerfil(perfilSelecionado: string): void {
    this.parceiro.tipo = perfilSelecionado.valueOf()
    this.perfil = false
    this.atualizarProgresso(25)
    if (perfilSelecionado.valueOf() == 'PROFISSIONAL') {
      this.perfilProfissional = true
    } else {
      this.perfilEmpresa = true
    }
  }

  atualizarProgresso(progresso: number) {
    this.progresso = (this.progresso + progresso)
    this.progressoStyle = { 'width': `${this.progresso}%` }
  }

  public salvarParceiro(): void {
      this.preencherRequest()
      this.parceiroService.salvarEndereco(this.parceiro)
        .pipe(
          tap((response: Parceiro) => {
            console.log(`Parceiro salvo com sucesso: ${JSON.stringify(response)}`)
            this.sucesso = true
            this.parceiroFormulario = false
            this.atualizarProgresso(100)
            this.titulo = "Sucesso"
          }))
        .subscribe()
  }

  private dadosEstaoValidos(): boolean {
    if (this.f.form.status !== "VALID") {
      this.montarMensagemDeErro();
      return false;
    }
    return true
  }

  private montarMensagemDeErro(): void {
    let description
    this.error = true;
    
    if (this.f.form.value.cpfCnpj.length < 11) {
      description = "CPF/CNPJ, "
    }

   description = description.concat("TEST")

    console.log(description)
  }

  private preencherRequest(): void {
    this.parceiro.cpfCnpj = this.f.form.value.cpfCnpj
    this.parceiro.descricao = this.f.form.value.descricao
    this.parceiro.documentacao = this.f.form.value.documentacao
    this.parceiro.email = this.f.form.value.email
    this.parceiro.mediaValorHora = this.f.form.value.valor
    this.parceiro.nome = this.f.form.value.nome
    this.parceiro.telefone = this.f.form.value.telefone
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Constants from '../../constants/constants';
import Pedido from '../../pedido/model/pedido.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrcamentoClienteService {

  private constantes: Constants

  constructor(private http: HttpClient) { this.constantes = new Constants() }

  public selecionarOrcamento(pedidoId: string, parceiroId: string): Observable<Pedido> {
    console.log(`Selecionando orçamento ${pedidoId} do fornecedor ${parceiroId}`)
    return this.http
      .patch<Pedido>(`${this.constantes.url}/orcamentos/${pedidoId}/selecionar/${parceiroId}`,
        this.constantes.httpOptions)
  }

  public cancelarOrcamento(pedidoId: string, parceiroId: string): Observable<Pedido> {
    console.log(`Cancelar orçamento ${pedidoId} do fornecedor ${parceiroId}`)
    return this.http
      .patch<Pedido>(`${this.constantes.url}/orcamentos/${pedidoId}/cancelar-selecao/${parceiroId}`,
        this.constantes.httpOptions)
  }

  public reprovarOrcamento(pedidoId: string, parceiroId: string): Observable<Pedido> {
    console.log(`Reprovar orçamento ${pedidoId} do fornecedor ${parceiroId}`)
    return this.http
      .patch<Pedido>(`${this.constantes.url}/orcamentos/${pedidoId}/reprovar/${parceiroId}`,
        this.constantes.httpOptions)
  }

  
}

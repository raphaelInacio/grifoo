import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import Constants from "../../constants/constants"
import Orcamento from '../model/orcamento.model';

@Injectable()
export class OrcamentoParceiroService {

  private constantes: Constants;

  constructor(private http: HttpClient) { this.constantes = new Constants() }

  public enviarOrcamento(pedidoId: string, orcamento: Orcamento): Observable<Orcamento> {
    return this.http
      .post<Orcamento>(`${this.constantes.url}/pedidos/${pedidoId}/orcamentos`,
        JSON.stringify(orcamento),
        this.constantes.httpOptions)
  }

}

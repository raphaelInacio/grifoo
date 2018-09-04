import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import Constants from "../../constants/constants"
import Pedido from "../model/pedido.model"

@Injectable()
export class PedidoService {

  private constantes: Constants;

  constructor(private http: HttpClient) { this.constantes = new Constants() }

  public salvarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http
      .post<Pedido>(`${this.constantes.url}/pedidos`,
        JSON.stringify(pedido),
        this.constantes.httpOptions)
  }

  public buscarPedido(pedidoId: string): Observable<Pedido> {
    return this.http
      .get<Pedido>(`${this.constantes.url}/pedidos/${pedidoId}`,
        this.constantes.httpOptions)
  }

  public buscarPedidos(): Observable<Array<Pedido>> {
    return this.http
      .get<Array<Pedido>>(`${this.constantes.url}/pedidos`,
        this.constantes.httpOptions)
  }

}

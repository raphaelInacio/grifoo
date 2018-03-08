import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Cliente from "../../cliente/model/cliente.model";
import { Injectable } from "@angular/core";
import Constants from "../../constants/constants"
import Pedido from "../model/pedido.model"

@Injectable()
export default class PedidoService {

  private constantes:Constants;
    
  constructor(private http: HttpClient){
    this.constantes = new Constants()
}

public salvarPedido(pedido:Pedido):Observable<Pedido> {
   return this.http
   .post<Pedido>( `${this.constantes.url}/pedidos`, 
   JSON.stringify(pedido), 
   this.constantes.httpOptions)
}

public buscarPedido(pedidoId:string):Observable<Pedido> {
    return this.http
    .get<Pedido>( `${this.constantes.url}/pedidos/${pedidoId}`, 
    this.constantes.httpOptions)
 }

}

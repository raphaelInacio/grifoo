import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Cliente from "../../cliente/model/cliente.model";
import { Injectable } from "@angular/core";
import Constants from "../../constants/constants"

@Injectable()
export default class ClienteService {
    
    private constantes:Constants;
    
    constructor(private http: HttpClient,){
        this.constantes = new Constants()
        
    }
    
    public salvarCliente(cliente:Cliente):Observable<Cliente> {
       return this.http
       .post<Cliente>( `${this.constantes.url}/clientes`, 
       JSON.stringify(cliente), 
       this.constantes.httpOptions)
    }

    public buscarCliente(clienteId:string):Observable<Cliente> {
        return this.http
        .get<Cliente>( `${this.constantes.url}/clientes/${clienteId}`, 
        this.constantes.httpOptions)
     }

}
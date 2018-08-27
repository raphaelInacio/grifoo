import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import Cliente from "../model/cliente.model";
import { Injectable } from "@angular/core";
import Constants from "../../constants/constants"
import { catchError } from 'rxjs/operators';

@Injectable()
export class ClienteService {

    private constantes: Constants;

    constructor(private http: HttpClient, ) {
        this.constantes = new Constants()
    }

    public salvarCliente(cliente: Cliente): Observable<Cliente> {
        return this.http
            .post<Cliente>(`${this.constantes.url}/clientes`,
                JSON.stringify(cliente),
                this.constantes.httpOptions)
    }

    public buscarCliente(clienteId: string): Observable<Cliente> {
        return this.http
            .get<Cliente>(`${this.constantes.url}/clientes/${clienteId}`,
                this.constantes.httpOptions)
    }

    private handleError(err: HttpErrorResponse | any) {
        console.error('An error occurred', err);
        return Observable.throw(err.message || err);
    }

}
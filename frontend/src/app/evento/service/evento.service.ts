import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Cliente from "../../cliente/model/cliente.model";
import { Injectable } from "@angular/core";
import Constants from "../../constants/constants"
import { Evento } from '../model/evento.model';

@Injectable()
export class EventoService {

  private constantes:Constants;
    
    constructor(private http: HttpClient){
        this.constantes = new Constants()
    }
    
    public salvarEvento(evento:Evento):Observable<Evento> {
       return this.http
       .post<Evento>( `${this.constantes.url}/eventos`, 
       JSON.stringify(evento), 
       this.constantes.httpOptions)
    }

    public buscarEvento(eventoId:string):Observable<Evento> {
        return this.http
        .get<Evento>( `${this.constantes.url}/eventos/${eventoId}`, 
        this.constantes.httpOptions)
     }
}

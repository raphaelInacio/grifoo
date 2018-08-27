import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Constants from '../../constants/constants';
import Parceiro from '../model/parceiro.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParceiroService {

  private constantes: Constants;
  
  constructor(private http: HttpClient) {
    this.constantes = new Constants()
  }

  public salvarEndereco(parceiros: Parceiro): Observable<Parceiro> {
    return this.http.post<Parceiro>(`${this.constantes.urlParceiros}/parceiros`,
        JSON.stringify(parceiros),
        this.constantes.httpOptions)
  }

  public buscarParceiro(parceiroId: string): Observable<Parceiro> {
    return this.http.get<Parceiro>(`${this.constantes.urlParceiros}/parceiros/${parceiroId}`, this.constantes.httpOptions)
  }

}

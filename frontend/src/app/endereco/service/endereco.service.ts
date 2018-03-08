import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Constants from '../../constants/constants';
import { Observable } from 'rxjs/Observable';
import Endereco from '../model/endereco.model';

@Injectable()
export class EnderecoService {
  private constantes:Constants;
    
  constructor(private http: HttpClient,){
      this.constantes = new Constants()
  }
  
  public salvarEndereco(endereco:Endereco):Observable<Endereco> {
     return this.http
     .post<Endereco>( `${this.constantes.url}/enderecos`, 
     JSON.stringify(endereco), 
     this.constantes.httpOptions)
  }

  public buscarEndereco(enderecoId:string):Observable<Endereco> {
      return this.http
      .get<Endereco>( `${this.constantes.url}/enderecos/${enderecoId}`, 
      this.constantes.httpOptions)
   }

}

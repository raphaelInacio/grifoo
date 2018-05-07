import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  Constants  from '../../constants/constants'

@Injectable()
export class PedidoEmpresaService {

  private constantes: Constants;

  constructor(private http: HttpClient, ) {
      this.constantes = new Constants()
  }


}

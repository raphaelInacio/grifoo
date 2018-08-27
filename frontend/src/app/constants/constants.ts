import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { pureArrayDef } from '@angular/core/src/view';

export default class Constants {
    
    public url:string = environment.URL_PEDIDOS
    public urlParceiros: string = environment.URL_PARCEIROS
    public cepApi:string = "https://viacep.com.br/ws/"
    public pass:string = environment.PEDIDOS_CLIENT

    public httpOptions = {
        headers: new HttpHeaders({
             'Content-Type': 'application/json'
             //,'Authorization': 'Basic YWRtaW46YWRtaW4='
            })
      };
    }

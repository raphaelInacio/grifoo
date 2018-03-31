import { HttpHeaders } from '@angular/common/http';
export default class Constants{
    
    public url:string = "http://grifoo.southcentralus.cloudapp.azure.com:3003/api/v1"
    public httpOptions = {
        headers: new HttpHeaders({
             'Content-Type': 'application/json', 
             'Authorization': 'Basic Z3JpZm9vY2xpZW50Ojlia3FkN2Ri'})
      };
}
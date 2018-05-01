import { HttpHeaders } from '@angular/common/http';
export default class Constants{
    
    public url:string = "http://18.219.240.83:3003/api/v1"
    public httpOptions = {
        headers: new HttpHeaders({
             'Content-Type': 'application/json'
             //,'Authorization': 'Basic YWRtaW46YWRtaW4='
            })
      };
}
import { HttpHeaders } from '@angular/common/http';
export default class Constants{
    
    public url:string = "http://grifoo.com:3003/api/v1"
    public httpOptions = {
        headers: new HttpHeaders({
             'Content-Type': 'application/json'
             //,'Authorization': 'Basic YWRtaW46YWRtaW4='
            })
      };
}
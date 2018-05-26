import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export default class Constants {
    public url:string = environment.URL_API
    public httpOptions = {
        headers: new HttpHeaders({
             'Content-Type': 'application/json'
             //,'Authorization': 'Basic YWRtaW46YWRtaW4='
            })
      };
    
    }

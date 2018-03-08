import { HttpHeaders } from '@angular/common/http';
export default class Constants{
    public url:string = "http://localhost:3003/api/v1"
    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
}
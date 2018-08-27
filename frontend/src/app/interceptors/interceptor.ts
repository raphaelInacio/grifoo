import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import Constants from '../constants/constants';
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor() { }

  private constantes: Constants

  intercept(req: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
    this.constantes = new Constants();
    
    console.log('Intercpet start......')
    
    if(req.url.indexOf("viacep.com.br") < 0){
      
      const dupReq = req.clone({
        headers: req.headers.set('Authorization', `Basic ${this.constantes.pass}`),
      });

      console.log(`Intercpet end ...... ${JSON.stringify(dupReq)}`)
      
      return next.handle(dupReq);
    }

    return next.handle(req);

  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})

export class Interceptor { }
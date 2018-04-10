import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {RouterModule } from '@angular/router'

import {ROUTES} from './app.routes'
import { Interceptor } from './interceptors/interceptor';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { EventoComponent } from './evento/evento.component';
import { ProgressoComponent } from './progresso/progresso.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { SucessoComponent } from './sucesso/sucesso.component';
import { HomeComponent } from './home/home.component';

import { EnderecoService } from './endereco/service/endereco.service';
import { EventoService } from './evento/service/evento.service';
import { ClienteService } from './cliente/services/cliente.service';
import { PedidoService }  from './pedido/service/pedido.service';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    PedidoComponent,
    ClienteComponent,
    EnderecoComponent,
    EventoComponent,
    ProgressoComponent,
    ConfirmacaoComponent,
    SucessoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    Interceptor
  ],
  providers: [ClienteService, PedidoService, EventoService, EnderecoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

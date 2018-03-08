import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'


import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { PedidoComponent } from './pedido/pedido.component';
import ClienteService from './cliente/services/cliente.service';
import { ClienteComponent } from './cliente/cliente.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { EventoComponent } from './evento/evento.component';
import { ProgressoComponent } from './progresso/progresso.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { SucessoComponent } from './sucesso/sucesso.component';

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
    SucessoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

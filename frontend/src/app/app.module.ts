import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {RouterModule } from '@angular/router'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {ROUTES} from './app.routes'

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
import { PedidoEmpresaComponent } from './pedido-empresa/pedido-empresa.component';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { ParceiroService } from './parceiro/service/parceiro.service';
import { ErrorFormComponent } from './error-form/error-form.component';
import { OrcamentoParceiroComponent } from './orcamento-parceiro/orcamento-parceiro.component';
import { Interceptor } from './interceptors/interceptor';
import { OrcamentoParceiroService } from './orcamento-parceiro/service/orcamento-parceiro.service';
import { OrcamentoClienteComponent } from './orcamento-cliente/orcamento-cliente.component';
import { OrcamentoClienteService } from './orcamento-cliente/service/orcamento-cliente.service';


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
    PedidoEmpresaComponent,
    ParceiroComponent,
    ErrorFormComponent,
    OrcamentoParceiroComponent,
    OrcamentoClienteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Interceptor,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, ClienteService, PedidoService, EventoService, EnderecoService, ParceiroService, OrcamentoParceiroService, OrcamentoClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { OrcamentoClienteComponent } from './orcamento-cliente/orcamento-cliente.component';
import { PedidoEmpresaComponent } from './pedido-empresa/pedido-empresa.component';
import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { OrcamentoParceiroComponent } from './orcamento-parceiro/orcamento-parceiro.component';

export const ROUTES: Routes = [
    { path: 'para-meu-evento/pedido', component: PedidoComponent },
    { path: 'para-minha-empresa/pedido', component: PedidoEmpresaComponent },
    { path: 'quero-ser-parceiro', component: ParceiroComponent },
    { path: 'parceiros/:parceiro-id/orcamentos/:orcamento-id', component: OrcamentoParceiroComponent },
    { path: 'clientes/:cliente-id/orcamentos/:orcamento-id', component: OrcamentoClienteComponent },
    { path: '', component: HomeComponent }
]
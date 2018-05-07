import { PedidoEmpresaComponent } from './pedido-empresa/pedido-empresa.component';
import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';

export const ROUTES: Routes = [
    {path: 'para-meu-evento/pedido', component: PedidoComponent},
    {path: 'para-minha-empresa/pedido', component: PedidoEmpresaComponent},
    {path: '', component: HomeComponent}
]
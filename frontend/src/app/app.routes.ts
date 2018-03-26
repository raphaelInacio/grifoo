import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { EmpresaComponent } from './empresa/empresa.component';

export const ROUTES: Routes = [
    {path: 'para-meu-evento/pedido', component: PedidoComponent},
    {path: 'para-minha-empresa/pedido', component: EmpresaComponent},
    {path: '', component: HomeComponent}
]
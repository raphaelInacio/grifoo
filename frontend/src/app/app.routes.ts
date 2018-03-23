import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';

export const ROUTES: Routes = [
    {path: 'para-meu-evento/pedido', component: PedidoComponent},
    {path: '', component: HomeComponent}
]
// tslint:disable:max-line-length

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ListarRestaurantesComponent } from './listar-restaurantes/listar-restaurantes.component';
import { LoginComponent } from './login/login.component';
import { RestauranteDetalhesComponent } from './restaurante/restaurante-detalhes/restaurante-detalhes.component';
import { CardapioComponent } from './restaurante/restaurante-detalhes/cardapio/cardapio.component';
import { AvaliacoesComponent } from './restaurante/restaurante-detalhes/avaliacoes/avaliacoes.component';


export const ROUTES: Routes = [
  // { path: 'sobre', component: SobreComponent },]
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: ListarRestaurantesComponent },
  {
    path: 'restaurantes/:id', component: RestauranteDetalhesComponent,
    children: [
      { path: '', redirectTo: 'cardapio', pathMatch: 'full' },
      { path: 'cardapio', component: CardapioComponent },
      { path: 'avaliacoes', component: AvaliacoesComponent }
    ]
  },


  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', redirectTo: 'home' },
  // redirect to home when route does not exists (must be last route)
];

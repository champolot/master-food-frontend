// tslint:disable:max-line-length

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ListarRestaurantesComponent } from './listar-restaurantes/listar-restaurantes.component';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
  // { path: 'sobre', component: SobreComponent },
  { path: 'home', component: HomeComponent },
  { path: 'listar-restaurantes', component: ListarRestaurantesComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminComponent,
  //     children: [
  //         {path: 'cadastrar-restaurantes', component: CadastroRestaurantesComponent }
  //     ]
  // },
  { path: '**', redirectTo: 'home' },
  // redirect to home when route does not exists (must be last route)
];

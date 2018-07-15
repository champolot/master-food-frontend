import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared-materialize/shared.materialize.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { CadastroRestaurantesComponent } from './cadastro-restaurantes/cadastro-restaurantes.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormRestauranteComponent } from './cadastro-restaurantes/form-restaurante/form-restaurante.component';

const ROUTES: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cadastro-restaurantes', component: CadastroRestaurantesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    HeaderAdminComponent,
    CadastroRestaurantesComponent,
    FormRestauranteComponent,
  ],
  imports: [
    SharedModule.forRoot(),
    RouterModule,
    RouterModule.forChild(ROUTES),
    NgxDatatableModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})


export class AdminModule { }

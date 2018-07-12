import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared-materialize/shared.materialize.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const ROUTES: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      // { path: 'teste-grid', component: TesteGridComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
  ],
  imports: [
    SharedModule.forRoot(),
    RouterModule,
    RouterModule.forChild(ROUTES)
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})


export class AdminModule { }

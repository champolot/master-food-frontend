import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestauranteService } from '../../listar-restaurantes/restaurante.service';

// ngx-materialize
import { MzNavbarModule } from 'ngx-materialize';
import { MzButtonModule, MzInputModule } from 'ngx-materialize';
import { MzSidenavModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { MzTextareaModule } from 'ngx-materialize';
import { MzTimepickerModule } from 'ngx-materialize';
import { MzSpinnerModule } from 'ngx-materialize';
import { MzValidationModule } from 'ngx-materialize';
import { MzModalModule } from 'ngx-materialize';
import { NotificationService } from '../messages/notification.service';
import { MzTabModule } from 'ngx-materialize';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MzNavbarModule, MzCardModule, MzSelectModule,
    MzButtonModule, MzInputModule, MzSidenavModule, MzIconModule, MzIconMdiModule, MzTextareaModule,
    MzTimepickerModule, MzSpinnerModule, MzValidationModule, MzModalModule, MzTabModule
  ],

  exports: [CommonModule, FormsModule, ReactiveFormsModule, MzNavbarModule, MzCardModule, MzSelectModule,
    MzButtonModule, MzInputModule, MzSidenavModule, MzIconModule, MzIconMdiModule, MzTextareaModule,
    MzTimepickerModule, MzSpinnerModule, MzValidationModule, MzModalModule, MzTabModule
  ],
})

export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RestauranteService, NotificationService]
    };
  }

}

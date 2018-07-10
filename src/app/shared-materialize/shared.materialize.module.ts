import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ngx-materialize
import { MzNavbarModule } from 'ngx-materialize';
import { MzButtonModule, MzInputModule } from 'ngx-materialize';
import { MzSidenavModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MzNavbarModule,
    MzButtonModule, MzInputModule, MzSidenavModule, MzIconModule, MzIconMdiModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MzNavbarModule,
    MzButtonModule, MzInputModule, MzSidenavModule, MzIconModule, MzIconMdiModule],
})

export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };

  }

}

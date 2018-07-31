import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.route';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/module/shared.materialize.module';
import { FooterComponent } from './footer/footer.component';
import { ListarRestaurantesComponent } from './listar-restaurantes/listar-restaurantes.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ApplicationErrorHandler } from './app.error-handler';
import { ErrorDialogComponent } from './shared/messages/error-dialog/error-dialog.component';

// import { MzModalService } from 'ngx-materialize';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ListarRestaurantesComponent,
    RestauranteComponent,
    LoginComponent,
    ErrorDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    // usando tecnica de preloading para carregar em outra thread
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [{ provide: ErrorHandler, useClass: ApplicationErrorHandler }],
  bootstrap: [AppComponent, ErrorDialogComponent]
})
export class AppModule { }

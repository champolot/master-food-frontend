import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.route';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared-materialize/shared.materialize.module';
import { FooterComponent } from './footer/footer.component';
import { ListarRestaurantesComponent } from './listar-restaurantes/listar-restaurantes.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ListarRestaurantesComponent,
    RestauranteComponent,
    LoginComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    // usando tecnica de preloading para carregar em outra thread
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

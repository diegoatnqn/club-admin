import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LightboxModule } from 'ngx-lightbox';
import { NoticiasComponent } from './noticias/noticias.component';
import { InjectionToken } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

//app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

//fin app config

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ActividadesComponent,
    NosotrosComponent,
    ContactoComponent,
    NoticiasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LightboxModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './komponente/home/home.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { PrijavaComponent } from './komponente/prijava/prijava.component';
import { PregledProstorovComponent } from './komponente/pregled-prostorov/pregled-prostorov.component';
import { DodajProstorComponent } from './komponente/dodaj-prostor/dodaj-prostor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistracijaComponent,
    PrijavaComponent,
    PregledProstorovComponent,
    DodajProstorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

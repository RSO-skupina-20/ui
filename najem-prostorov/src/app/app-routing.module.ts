import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './komponente/home/home.component';
import {RegistracijaComponent} from './komponente/registracija/registracija.component';
import {PrijavaComponent} from './komponente/prijava/prijava.component';
import {PregledProstorovComponent} from './komponente/pregled-prostorov/pregled-prostorov.component';
import {DodajProstorComponent} from './komponente/dodaj-prostor/dodaj-prostor.component';
import {UrediProstorComponent} from './komponente/uredi-prostor/uredi-prostor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'prostori', component: PregledProstorovComponent},
  {path: 'prostori/dodaj', component: DodajProstorComponent},
  {path: 'prostori/uredi/:id', component: UrediProstorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

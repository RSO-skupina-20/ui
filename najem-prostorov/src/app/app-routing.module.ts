import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './komponente/home/home.component';
import {RegistracijaComponent} from './komponente/registracija/registracija.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registracija', component: RegistracijaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

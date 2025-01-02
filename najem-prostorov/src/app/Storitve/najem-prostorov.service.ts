import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BROWSER_STORAGE} from '../Razredi/shramba';
import {Uporabnik} from '../Razredi/Uporabnik';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NajemProstorovService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private shramba: Storage) { }

  private uporabnikiUrl = 'http://localhost:8081/v1/uporabniki';

  public registrirajUporabnika(uporabnik: Uporabnik): Observable<any> {
    const url: string = `${this.uporabnikiUrl}/registracija`;
    const headers = { 'content-type': 'application/json' };
    return this.http
      .post(url, {
        ime: uporabnik.ime,
        priimek: uporabnik.priimek,
        email: uporabnik.email,
        geslo: uporabnik.geslo,
        geslo2: uporabnik.geslo2,
        telefon: uporabnik.telefon,
        tipUporabnika: uporabnik.tip
      }, { headers});
  }
}

import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BROWSER_STORAGE} from '../Razredi/shramba';
import {Uporabnik} from '../Razredi/Uporabnik';
import {Observable} from 'rxjs';
import {Prostor} from '../Razredi/Prostor';

@Injectable({
  providedIn: 'root'
})
export class NajemProstorovService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private shramba: Storage) {
  }

  private uporabnikiUrl = 'http://localhost:8081/v1/uporabniki';

  public registrirajUporabnika(uporabnik: Uporabnik): Observable<any> {
    const url: string = `${this.uporabnikiUrl}/registracija`;
    const headers = {'content-type': 'application/json'};
    console.log(uporabnik);
    return this.http
      .post(url, {
        ime: uporabnik.ime,
        priimek: uporabnik.priimek,
        email: uporabnik.email,
        geslo: uporabnik.geslo,
        geslo2: uporabnik.geslo2,
        telefon: uporabnik.telefon,
        tipUporabnika: uporabnik.tip
      }, {headers});
  }

  public prijaviUporabnika(email: String, geslo: String): Observable<any> {
    const url: string = `${this.uporabnikiUrl}/prijava`;
    const httpOptions = {
      headers: new HttpHeaders()
    }
    httpOptions.headers.append("Content-Type", "application/json");
    httpOptions.headers.append("Access-Control-Allow-Origin", "*");
    httpOptions.headers.append("Access-Control-Allow-Methods", "GET, POST");
    httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post(url, {email, geslo}, httpOptions);
  }

  public pridobiProstore(): Observable<any> {
    const url: string = 'http://localhost:8080/v1/prostori';
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .get(url, {headers});
  }

  public pridobiProstoreLastnika(idLastnika: number): Observable<any> {
    const url: string = `http://localhost:8080/v1/prostori/lastnik/${idLastnika}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .get(url, {headers});
  }

  public dodajProstor(prostor: Prostor) {
    const url: string = 'http://localhost:8080/v1/prostori';
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .post(url, {
        ime: prostor.ime,
        opis: prostor.opis,
        lokacija: prostor.lokacija,
        cena: prostor.cena,
        velikost: prostor.velikost
      }, {headers});

  }

  public pridobiProstor(id: number): Observable<any> {
    const url: string = `http://localhost:8080/v1/prostori/${id}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .get(url, {headers});
  }

  public posodobiProstor(prostor: any): Observable<any> {
    const url: string = `http://localhost:8080/v1/prostori/${prostor.id}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .put(url, {
        ime: prostor.ime,
        opis: prostor.opis,
        lokacija: prostor.lokacija,
        cena: prostor.cena,
        velikost: prostor.velikost
      }, {headers});

  }

  pridobiDogodkeProstora(prostorId: any) {
    const url: string = `http://localhost:8082/v1/dogodki/prostor/${prostorId}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http.get(url, {headers});
  }
}

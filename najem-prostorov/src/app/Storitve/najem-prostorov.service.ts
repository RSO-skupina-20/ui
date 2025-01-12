import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BROWSER_STORAGE} from '../Razredi/shramba';
import {Uporabnik} from '../Razredi/Uporabnik';
import {Observable} from 'rxjs';
import {Prostor} from '../Razredi/Prostor';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NajemProstorovService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private shramba: Storage) {
  }

  //private uporabnikiUrl = 'http://localhost:8081/v1/uporabniki';

  private uporabnikiUrl = environment.uporabnikUrl;
  private prostoriUrl = environment.prostoriUrl;
  private dogodkiUrl = environment.dogodkiUrl;

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
    //const url: string = 'http://localhost:8080/v1/prostori';
    const url: string = this.prostoriUrl;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .get(url, {headers});
  }

  public pridobiProstoreLastnika(idLastnika: number): Observable<any> {
    //const url: string = `http://localhost:8080/v1/prostori/lastnik/${idLastnika}`;
    const url: string = `${this.prostoriUrl}/lastnik/${idLastnika}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .get(url, {headers});
  }

  public dodajProstor(prostor: Prostor) {
    //const url: string = 'http://localhost:8080/v1/prostori';
    const url: string = this.prostoriUrl;
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
    //const url: string = `http://localhost:8080/v1/prostori/${id}`;
    const url: string = `${this.prostoriUrl}/${id}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http
      .get(url, {headers});
  }

  public posodobiProstor(prostor: any): Observable<any> {
    //const url: string = `http://localhost:8080/v1/prostori/${prostor.id}`;
    const url: string = `${this.prostoriUrl}/${prostor.id}`;
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

  public pridobiDogodkeProstora(prostorId: any) {
    //const url: string = `http://localhost:8082/v1/dogodki/prostor/${prostorId}`;
    const url: string = `${this.dogodkiUrl}/prostor/${prostorId}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http.get(url, {headers});
  }

  public pridobiDogodke(id: any) {
    //const url: string = `http://localhost:8082/v1/dogodki/uporabnik/${id}`;
    const url: string = `${this.dogodkiUrl}/uporabnik/${id}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http.get(url, {headers});

  }

  public pridobiVseDogodke() {
    //const url: string = `http://localhost:8082/v1/dogodki`;
    const url: string = `${this.dogodkiUrl}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http.get(url, {headers});
  }

  public posodobiDogodek(id: string, naziv: string, zacetek: string, konec: string, opis: string, cena: string) {
    //const url: string = `http://localhost:8082/v1/dogodki/${id}`;
    const url: string = `${this.dogodkiUrl}/${id}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http.put(url, {
      naziv: naziv,
      zacetek: zacetek,
      konec: konec,
      opis: opis,
      cena: cena
    }, {headers});
  }

  public dodajGosta(id_dogodek: number, ime: string, priimek: string, email: string) {
    //const url: string = `http://localhost:8082/v1/povabljeni`;
    const url: string = `${this.dogodkiUrl}/povabljeni`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http.post(url, {
      ime: ime,
      priimek: priimek,
      email: email,
      id_dogodek: id_dogodek,
      sprejeto: false
    }, {headers});

  }

  public dodajDogodek(data: any) {
    //const url: string = `http://localhost:8082/v1/dogodki`;
    const url: string = `${this.dogodkiUrl}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.shramba.getItem('token')}`)
    return this.http.post(url, data, {headers});
  }
}

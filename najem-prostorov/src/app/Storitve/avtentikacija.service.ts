import {Inject, Injectable} from '@angular/core';
import {BROWSER_STORAGE} from '../Razredi/shramba';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {NajemProstorovService} from './najem-prostorov.service';

@Injectable({
  providedIn: 'root'
})
export class AvtentikacijaService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private http: HttpClient, private najemProstorovService: NajemProstorovService) {
  }

  public pridobiZeton(): string | null {
    return this.storage.getItem('token');
  }

  public shraniZeton(zeton: string): void {
    this.storage.setItem('token', zeton);
  }

  public odjava(): void {
    this.storage.removeItem('token');
  }

  public prijava(email: string, geslo: string): Observable<any> {
    return this.najemProstorovService
      .prijaviUporabnika(email, geslo)
      .pipe(
        tap((zeton) => this.shraniZeton(zeton))
      );
  }
}

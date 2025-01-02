import {Inject, Injectable} from '@angular/core';
import {BROWSER_STORAGE} from '../Razredi/shramba';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AvtentikacijaService {

  constructor(@Inject(BROWSER_STORAGE) private  storage: Storage, private http: HttpClient) { }

  public pridobiZeton(): string | null {
    return this.storage.getItem('token');
  }

  public shraniZeton(zeton: string): void {
    this.storage.setItem('token', zeton);
  }

  public odjava(): void {
    this.storage.removeItem('token');
  }
}

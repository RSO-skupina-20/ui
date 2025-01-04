import {Component} from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {AvtentikacijaService} from '../../Storitve/avtentikacija.service';
import {NajemProstorovService} from '../../Storitve/najem-prostorov.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Uporabnik} from '../../Razredi/Uporabnik';
import {jwtDecode} from 'jwt-decode'
import {Router} from '@angular/router';

@Component({
  selector: 'app-prijava',
  standalone: false,

  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.css'
})
export class PrijavaComponent {
  public uporabnik: any;

  constructor(private avtentikacijaService: AvtentikacijaService, private najemProstorovService: NajemProstorovService, private router: Router) {
  }

  public async preveriVnos() {
    let email = (document.getElementById('email') as HTMLInputElement).value;
    let geslo = (document.getElementById('geslo') as HTMLInputElement).value;

    if (!email || !geslo) {
      alert("Prosim izpolnite vsa polja!");
      return;
    }

    // Preveri ce je email pravilno vnešen
    let emailCheckRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!emailCheckRegex.test(email)) {
      alert("Prosim vnesite veljaven email naslov!");
      return;
    }

    await this.prijava(email, geslo);
    await this.pridobiUporabnika();
    if (this.uporabnik.role === 'uporabnik') {
      await this.router.navigate(['/dogodki']);
    }
    else {
      await this.router.navigate(['/prostori']);
    }
  }

  public async prijava(email: string, geslo: string) {
    try {
      const odgovor = await lastValueFrom(this.avtentikacijaService.prijava(email, geslo));
      if (odgovor?.napaka) {
        alert(odgovor.napaka);
      } else if (odgovor?.jwt) {
        console.log("Prijava uspešna. Žeton:", odgovor.jwt);
        this.avtentikacijaService.shraniZeton(odgovor.jwt);
      }
    } catch (napaka) {
      if (napaka instanceof HttpErrorResponse) {
        alert(`Napaka: ${napaka.error?.napaka || napaka.message}`);
      } else {
        alert("Prišlo je do napake. Poskusite znova.");
      }
    }
  }


  private async pridobiUporabnika(): Promise<any> {
    let zeton = this.avtentikacijaService.pridobiZeton();
    if (zeton) {
      try {
        this.uporabnik = jwtDecode(zeton);
      } catch (error) {
        console.error("Invalid token specified:", error);
        alert("Neveljaven žeton!");
      }
    }
  }
}

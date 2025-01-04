import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Uporabnik} from '../../Razredi/Uporabnik';
import {NajemProstorovService} from '../../Storitve/najem-prostorov.service';

@Component({
  selector: 'app-registracija',
  standalone: false,

  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css'
})
export class RegistracijaComponent {
  constructor(private router: Router, private najemProstorovService: NajemProstorovService) {
  }

  public uporabnik: Uporabnik = new Uporabnik();

  potrdiRegistracijo() {
    //Pridobi vse podatke iz inputov
    this.uporabnik.ime = (document.getElementById('ime') as HTMLInputElement).value;
    this.uporabnik.priimek = (document.getElementById('priimek') as HTMLInputElement).value;
    this.uporabnik.telefon = (document.getElementById('telefon') as HTMLInputElement).value;
    this.uporabnik.email = (document.getElementById('email') as HTMLInputElement).value;
    this.uporabnik.geslo = (document.getElementById('geslo') as HTMLInputElement).value;
    this.uporabnik.geslo2 = (document.getElementById('geslo2') as HTMLInputElement).value;
    this.uporabnik.tip = (document.getElementById('tip_uporabnika') as HTMLSelectElement).value;

    // Pridobi ce so vsa polja izpoljenja
    if (this.uporabnik.ime == "" || this.uporabnik.priimek == "" || this.uporabnik.email == "" || this.uporabnik.geslo == ""
      || this.uporabnik.geslo2 == "" || this.uporabnik.telefon == "" || this.uporabnik.tip == "") {
      alert("Prosim izpolnite vsa polja!");
      return;
    }

    // Preveri ce se gesli ujemata
    if (this.uporabnik.geslo != this.uporabnik.geslo2) {
      alert("Gesli se ne ujemata!");
      return;
    }

    // Preveri ce je email pravilno vnešen
    let emailCheckRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!emailCheckRegex.test(this.uporabnik.email)) {
      alert("Prosim vnesite veljaven email naslov!");
      return;
    }

    // registriraj uporabnika
    this.najemProstorovService.registrirajUporabnika(this.uporabnik).subscribe(
      (uporabnik) => {
        console.log("Uporabnik uspešno registriran: ", uporabnik);
        alert("Registracija uspešna!");
        this.router.navigate(['/prijava']);
      },
      (napaka) => {
        console.error("Prišlo je do napake pri registraciji uporabnika: ", napaka);
        alert("Prišlo je do napake pri registraciji uporabnika!");
      }
    );
  }
}

import {Component} from '@angular/core';
import {AvtentikacijaService} from '../../Storitve/avtentikacija.service';
import {NajemProstorovService} from '../../Storitve/najem-prostorov.service';
import {Router} from '@angular/router';
import {Prostor} from '../../Razredi/Prostor';

@Component({
  selector: 'app-dodaj-prostor',
  standalone: false,

  templateUrl: './dodaj-prostor.component.html',
  styleUrl: './dodaj-prostor.component.css'
})
export class DodajProstorComponent {

  public prostor: Prostor = new Prostor();

  constructor(private avtentikacijaService: AvtentikacijaService, private najemProstorovService: NajemProstorovService, private router: Router) {
  }

  public dodajProstor() {
    this.prostor.ime = (document.getElementById('ime') as HTMLInputElement).value;
    this.prostor.opis = (document.getElementById('opis') as HTMLInputElement).value;
    this.prostor.lokacija = (document.getElementById('lokacija') as HTMLInputElement).value;
    this.prostor.cena = (document.getElementById('cena') as HTMLInputElement).value;
    this.prostor.velikost = (document.getElementById('velikost') as HTMLInputElement).value;

    // Pridobi ce so vsa polja izpolnjena
    if (this.prostor.ime === "" || this.prostor.opis === "" || this.prostor.lokacija === ""
      || this.prostor.cena === "" || this.prostor.velikost === "") {
      alert("Prosim izpolnite vsa polja!");
      return;
    }

    // Preveri ce sta cena in velikost stevili in vecji od 0
    if (isNaN(Number(this.prostor.cena)) || isNaN(Number(this.prostor.velikost))
      || Number(this.prostor.cena) <= 0 || Number(this.prostor.velikost) <= 0) {
      alert("Cena in velikost morata biti števili večji od 0!");
      return;
    }

    this.najemProstorovService.dodajProstor(this.prostor).subscribe(
      (prostor) => {
        console.log("Prostor uspešno dodan: ", prostor);
        alert("Prostor uspešno dodan!");
        this.router.navigate(['/prostori']);
      },
      (napaka) => {
        console.error("Prišlo je do napake pri dodajanju prostora: ", napaka);
        alert("Prišlo je do napake pri dodajanju prostora!");
      }
    );

  }
}

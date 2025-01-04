import {Component, OnInit} from '@angular/core';
import {AvtentikacijaService} from '../../Storitve/avtentikacija.service';
import {NajemProstorovService} from '../../Storitve/najem-prostorov.service';
import {ActivatedRoute, Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-pregled-dogodkov',
  standalone: false,

  templateUrl: './pregled-dogodkov.component.html',
  styleUrl: './pregled-dogodkov.component.css'
})
export class PregledDogodkovComponent implements OnInit {
  public uporabnik: any;
  public dogodki: any;
  public dogodek: any;
  public naziv: any;
  public zacetek: any;
  public konec: any;
  public opis: any;
  public cena: any;

  public showPodrobnosti: boolean = false;
  public dodajGostaVisible: boolean = false;
  public novGost = {ime: '', priimek: '', email: ''};

  constructor(
    private avtentikacijaService: AvtentikacijaService,
    private najemProstorovService: NajemProstorovService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  private async pridobiUporabnika(): Promise<any> {
    const zeton = this.avtentikacijaService.pridobiZeton();
    if (zeton) {
      this.uporabnik = jwtDecode(zeton);
    }
  }

  // Pridobi dogodke uporabnika
  izbranDogodek: any;
  isEditing: boolean = false;

  private async pridobiDogodke(): Promise<void> {
    if (this.uporabnik.role === 'uporabnik') {
      this.najemProstorovService.pridobiDogodke(this.uporabnik.id).subscribe(
        (dogodki) => {
          this.dogodki = Array.isArray(dogodki) ? dogodki : [];
          console.log("Dogodki: ", this.dogodki);
        },
        (error) => {
          console.error("Napaka pri pridobivanju dogodkov: ", error);
          alert("Napaka pri pridobivanju dogodkov");
        }
      );
    } else {
      this.najemProstorovService.pridobiVseDogodke().subscribe(
        (dogodki) => {
          this.dogodki = Array.isArray(dogodki) ? dogodki : [];
          console.log("Vsi Dogodki: ", this.dogodki);
        },
        (error) => {
          console.error("Napaka pri pridobivanju vseh dogodkov: ", error);
          alert("Napaka pri pridobivanju vseh dogodkov");
        }
      );
    }
  }

  async ngOnInit(): Promise<void> {
    await this.pridobiUporabnika();
    await this.pridobiDogodke();

  }

  onDogodekClick(id_dogodek: any, index: any) {
    this.showPodrobnosti = true;
    this.izbranDogodek = this.dogodki[index];
    this.naziv = this.izbranDogodek.naziv;
    this.zacetek = this.izbranDogodek.zacetek;
    this.konec = this.izbranDogodek.konec;
    this.opis = this.izbranDogodek.opis;
    this.cena = this.izbranDogodek.cena;

    console.log("Izbran dogodek: ", this.izbranDogodek);

  }

  odpriSeznamGostov() {

  }

  omogociUrejanje() {
    this.isEditing = true;

  }

  shraniSpremembe() {
    // Preberi vrednosti iz inputov
    let naziv = (document.getElementById('naziv') as HTMLInputElement).value;
    let zacetek = (document.getElementById('zacetek') as HTMLInputElement).value;
    let konec = (document.getElementById('konec') as HTMLInputElement).value;
    let opis = (document.getElementById('opis') as HTMLInputElement).value;
    let cena = (document.getElementById('cena') as HTMLInputElement).value;

    // Pridobi ce so vsa polja izpolnjena
    if (naziv === "" || zacetek === "" || konec === "" || opis === "" || cena === "") {
      alert("Polja ne smejo biti prazna!");
      return;
    }

    // Preveri ce je cena stevilo in vecja od 0
    if (isNaN(Number(cena)) || Number(cena) <= 0) {
      alert("Cena mora biti število večje od 0!");
      return;
    }

    // Posodobi dogodek
    this.najemProstorovService.posodobiDogodek(this.izbranDogodek.id_dogodek, naziv, zacetek, konec, opis, cena).subscribe(
      (dogodek) => {
        console.log("Dogodek uspešno posodobljen: ", dogodek);
        alert("Dogodek uspešno posodobljen!");
        this.isEditing = false;
        this.ngOnInit();
      },
      (napaka) => {
        console.error("Prišlo je do napake pri posodabljanju dogodka: ", napaka);
        alert("Prišlo je do napake pri posodabljanju dogodka!");
      }
    );


  }

  prekliciUrejanje() {
    this.isEditing = false;

  }

  shraniGosta() {
    // Pridobi vrednosti iz inputov
    let ime = this.novGost.ime;
    let priimek = this.novGost.priimek;
    let email = this.novGost.email;

    // Pridobi ce so vsa polja izpolnjena
    if (ime === "" || priimek === "" || email === "") {
      alert("Prosim izpolnite vsa polja!");
      return;
    }

    // Preveri ce je email pravilno vnešen
    let emailCheckRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!emailCheckRegex.test(email)) {
      alert("Prosim vnesite veljaven email naslov!");
      return;
    }

    console.log("Dodajam gosta: ", ime, priimek, email);
    console.log("Dogodek: ", this.izbranDogodek.id_dogodek);

    // Dodaj gosta
    this.najemProstorovService.dodajGosta(this.izbranDogodek.id_dogodek, ime, priimek, email).subscribe(
      (gost) => {
        console.log("Gost uspešno dodan: ", gost);
        alert("Gost uspešno dodan!");
        this.ngOnInit();
      },
      (napaka) => {
        console.error("Prišlo je do napake pri dodajanju gosta: ", napaka);
        alert("Prišlo je do napake pri dodajanju gosta!");
      }
    );

    //Izbrisi inpute
    this.novGost.ime = '';
    this.novGost.priimek = '';
    this.novGost.email = '';
    this.dodajGostaVisible = false;
  }

  prekliciDodajanje() {
    //Izbrisi inpute
    this.novGost.ime = '';
    this.novGost.priimek = '';
    this.novGost.email = '';
    this.dodajGostaVisible = false;
  }

  prikaziDodajGosta() {
    this.dodajGostaVisible = true;
  }
}

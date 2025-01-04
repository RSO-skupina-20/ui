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
  public prostor: any;
  public naziv: any;
  public zacetek: any;
  public konec: any;
  public opis: any;
  public cena: any;
  public prostori: any;
  public novDogodek = {
    naziv: '',
    zacetek: '',
    konec: '',
    opis: '',
    cena: '',
    id_prostor: ''
  };

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
  showDodajDogodek: boolean = false;

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

  private async pridobiVseProstore() {
    this.najemProstorovService.pridobiProstore().subscribe(
      (prostori) => {
        this.prostori = Array.isArray(prostori) ? prostori : [];
        console.log("Prostori: ", this.prostori);
      },
      (error) => {
        console.error("Napaka pri pridobivanju prostorov: ", error);
        alert("Napaka pri pridobivanju prostorov");
      }
    );
  }

  async ngOnInit(): Promise<void> {
    await this.pridobiUporabnika();
    await this.pridobiDogodke();

  }

  public onDogodekClick(id_dogodek: any, index: any) {
    this.showPodrobnosti = true;
    this.izbranDogodek = this.dogodki[index];
    // Pridobi podrobnosti prostora
    this.najemProstorovService.pridobiProstor(this.izbranDogodek.id_prostor).subscribe(
      (prostor) => {
        this.prostor = prostor;
        this.prostor.celotniNaziv = this.prostor.ime + " - " + this.prostor.lokacija;
        this.naziv = this.izbranDogodek.naziv;
        this.zacetek = this.izbranDogodek.zacetek;
        this.konec = this.izbranDogodek.konec;
        this.opis = this.izbranDogodek.opis;
        this.cena = this.izbranDogodek.cena;
        console.log("Izbran dogodek: ", this.izbranDogodek);
        console.log("Prostor: ", this.prostor);
      },
      (error) => {
        console.error("Napaka pri pridobivanju prostora: ", error);
        alert("Napaka pri pridobivanju prostora");
      }
    );
  }

  public async omogociUrejanje() {
    await this.pridobiVseProstore();
    this.isEditing = true;
    console.log(this.prostori);

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

  dodajDogodek() {
    this.pridobiVseProstore()
    this.showDodajDogodek = true;

  }

  shraniDogodek() {
    // Preveri ce so vsa polja izpolnjena
    if (this.novDogodek.naziv === "" || this.novDogodek.zacetek === ""
      || this.novDogodek.konec === "" || this.novDogodek.opis === "" || this.novDogodek.cena === ""
      || this.novDogodek.id_prostor === "") {
      alert("Izpolnite vsa polja!");
      return;
    }

    // Preveri ce je zacetek pred koncem
    if (this.novDogodek.zacetek >= this.novDogodek.konec) {
      alert("Začetek mora biti pred koncem!");
      return;
    }

    // Dodaj dogodek
    let data = {
      naziv: this.novDogodek.naziv,
      zacetek: this.novDogodek.zacetek,
      konec: this.novDogodek.konec,
      opis: this.novDogodek.opis,
      cena: this.novDogodek.cena,
      id_uporabnik: this.uporabnik.id,
      id_prostor: this.novDogodek.id_prostor
    }

    this.najemProstorovService.dodajDogodek(data).subscribe(
      (dogodek) => {
        console.log("Dogodek uspešno dodan: ", dogodek);
        alert("Dogodek uspešno dodan!");
        this.novDogodek.naziv = '';
        this.novDogodek.zacetek = '';
        this.novDogodek.konec = '';
        this.novDogodek.opis = '';
        this.showDodajDogodek = false;
      },
      (napaka) => {
        console.error("Prišlo je do napake pri dodajanju dogodka: ", napaka);
        alert("Prišlo je do napake pri dodajanju dogodka!");
      }
    );

  }

  prekliciDodajanjeDogodka() {
    //Izbrisi inpute
    this.novDogodek.naziv = '';
    this.novDogodek.zacetek = '';
    this.novDogodek.konec = '';
    this.novDogodek.opis = '';
    this.showDodajDogodek = false;
    console.log("Dodajanje dogodka preklicano");
  }
}

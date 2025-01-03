import {Component, OnInit} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {AvtentikacijaService} from '../../Storitve/avtentikacija.service';
import {NajemProstorovService} from '../../Storitve/najem-prostorov.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-uredi-prostor',
  standalone: false,
  templateUrl: './uredi-prostor.component.html',
  styleUrl: './uredi-prostor.component.css',
})
export class UrediProstorComponent implements OnInit {
  public uporabnik: any;
  public prostorId: any;
  public prostor: any;
  public dogodki: any;

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

  ngOnInit(): void {
    this.pridobiUporabnika();
    this.route.params.subscribe((params) => {
      this.prostorId = +params['id'];
      this.najemProstorovService.pridobiProstor(this.prostorId).subscribe(
        (prostor) => {
          console.log('Prostor: ', prostor);
          this.prostor = prostor;
          this.pridobiDogodke();
          this.izpolniPolja();
        },
        (error) => {
          console.error('Napaka pri pridobivanju prostora: ', error);
          alert('Napaka pri pridobivanju prostora');
        }
      );
    });
  }

  // Izpolni polja z podatki prostora
  public izpolniPolja() {
    (document.getElementById('ime') as HTMLInputElement).value = this.prostor.ime;
    (document.getElementById('opis') as HTMLInputElement).value = this.prostor.opis;
    (document.getElementById('lokacija') as HTMLInputElement).value = this.prostor.lokacija;
    (document.getElementById('cena') as HTMLInputElement).value = this.prostor.cena;
    (document.getElementById('velikost') as HTMLInputElement).value = this.prostor.velikost;
  }

  // Posodobi prostor
  public posodobiProstor() {
    this.prostor.ime = (document.getElementById('ime') as HTMLInputElement).value;
    this.prostor.opis = (document.getElementById('opis') as HTMLInputElement).value;
    this.prostor.lokacija = (document.getElementById('lokacija') as HTMLInputElement).value;
    this.prostor.cena = (document.getElementById('cena') as HTMLInputElement).value;
    this.prostor.velikost = (document.getElementById('velikost') as HTMLInputElement).value;

    // Preveri, če so vsa polja izpolnjena
    if (
      !this.prostor.ime ||
      !this.prostor.opis ||
      !this.prostor.lokacija ||
      !this.prostor.cena ||
      !this.prostor.velikost
    ) {
      alert('Polje ne sme biti prazno!');
      return;
    }

    // Preveri, če sta cena in velikost številki in večji od 0
    if (
      isNaN(Number(this.prostor.cena)) ||
      isNaN(Number(this.prostor.velikost)) ||
      Number(this.prostor.cena) <= 0 ||
      Number(this.prostor.velikost) <= 0
    ) {
      alert('Cena in velikost morata biti števili večji od 0!');
      return;
    }

    this.najemProstorovService.posodobiProstor(this.prostor).subscribe(
      (prostor) => {
        console.log('Prostor uspešno posodobljen: ', prostor);
        alert('Prostor uspešno posodobljen!');
        this.router.navigate(['/prostori/uredi/' + this.prostorId]);
      },
      (napaka) => {
        console.error('Prišlo je do napake pri posodabljanju prostora: ', napaka);
        alert('Prišlo je do napake pri posodabljanju prostora!');
      }
    );
  }

  // Pridobi vse dogodke za prostor
  public pridobiDogodke() {
    this.najemProstorovService.pridobiDogodkeProstora(this.prostorId).subscribe(
      (dogodki) => {
        this.dogodki = dogodki;
        console.log('Dogodki: ', this.dogodki);
      },
      (error) => {
        console.error('Napaka pri pridobivanju dogodkov: ', error);
        alert('Napaka pri pridobivanju dogodkov');
      }
    );
  }
}

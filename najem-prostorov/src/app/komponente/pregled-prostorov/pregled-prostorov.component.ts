import {Component, OnInit} from '@angular/core';
import {NajemProstorovService} from '../../Storitve/najem-prostorov.service';
import {AvtentikacijaService} from '../../Storitve/avtentikacija.service';
import {jwtDecode} from 'jwt-decode';
import {lastValueFrom} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pregled-prostorov',
  standalone: false,

  templateUrl: './pregled-prostorov.component.html',
  styleUrl: './pregled-prostorov.component.css'
})
export class PregledProstorovComponent implements OnInit {
  constructor(private najemProstorovService: NajemProstorovService, private avtentikacijaService: AvtentikacijaService, private router: Router) {
  }

  public uporabnik: any;
  public prostori: any;

  // Pridobi prostore
  selectedOption: string = "vsi";

  private async pridobiUporabnika(): Promise<any> {
    let zeton = this.avtentikacijaService.pridobiZeton();

    if (zeton) {
      this.uporabnik = jwtDecode(zeton);
    }
    console.log("Zeton: ", zeton);
    console.log("Uporabnik: ", this.uporabnik);

  }

  private async pridobiProstore(): Promise<void> {
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

  private async pridobiProstoreLastnika(): Promise<void> {
    this.najemProstorovService.pridobiProstoreLastnika(this.uporabnik.id).subscribe(
      (prostori) => {
        this.prostori = Array.isArray(prostori) ? prostori : [];
        console.log("Prostori lastnika: ", this.prostori);
      },
      (error) => {
        console.error("Napaka pri pridobivanju prostorov: ", error);
        alert("Napaka pri pridobivanju prostorov");
      }
    );
  }

  ngOnInit(): void {
    this.pridobiUporabnika().then(() => {
      console.log("Finished pridobiUporabnika");
      if (this.uporabnik.tipUporabnika === "LASTNIK") {
        this.spremeniPrikazProstorov();
      } else {
        alert("Nimate pravic za ogled te strani!");
        // redirect to home page
        this.router.navigate(['']);
      }
    });
  }

  spremeniPrikazProstorov() {
    console.log(this.selectedOption);
    if (this.selectedOption === "vsi") {
      this.pridobiProstore().then(() => {
        console.log("Finished pridobiProstore");
        console.log("Prostori: ", this.prostori);
      });
    } else {
      this.pridobiProstoreLastnika().then(() => {
        console.log("Finished pridobiProstoreLastnika");
        console.log("Prostori: ", this.prostori);
      });

    }
  }
}

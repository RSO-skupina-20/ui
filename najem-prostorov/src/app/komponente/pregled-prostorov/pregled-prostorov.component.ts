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

  private async pridobiUporabnika(): Promise<any> {
    let zeton = this.avtentikacijaService.pridobiZeton();

    if (zeton) {
      this.uporabnik = jwtDecode(zeton);
    }
    console.log("Zeton: ", zeton);
    console.log("Uporabnik: ", this.uporabnik);

  }

  // Pridobi prostore
  private async pridobiProstore(): Promise<any> {
    this.prostori = this.najemProstorovService
      .pridobiProstore()
      .subscribe(
        (prostori) => {
          this.prostori = prostori;
          console.log("Prostori: ", this.prostori);
        },
        (error) => {
          console.error("Napaka pri pridobivanju prostorov: ", error);
          alert("Napaka pri pridobivanju prostorov")
        })

    return this.prostori;
  }

  ngOnInit(): void {
    this.pridobiUporabnika().then(() => {
      console.log("Finished pridobiUporabnika");
      if (this.uporabnik.tipUporabnika === "LASTNIK") {
        this.pridobiProstore().then(() => {
          console.log("Finished pridobiProstore");
          console.log("Prostori: ", this.prostori);
        });
      } else {
        alert("Nimate pravic za ogled te strani!");
        // redirect to home page
        this.router.navigate(['']);
      }
    });
  }
}

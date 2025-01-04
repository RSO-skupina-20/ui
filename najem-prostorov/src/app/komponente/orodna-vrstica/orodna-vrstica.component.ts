import {Component, input, Input} from '@angular/core';
import {AvtentikacijaService} from '../../Storitve/avtentikacija.service';
@Component({
  selector: 'app-orodna-vrstica',
  standalone: false,

  templateUrl: './orodna-vrstica.component.html',
  styleUrl: './orodna-vrstica.component.css'
})
export class OrodnaVrsticaComponent {
  constructor(private avtentikacijaService: AvtentikacijaService) { }
  @Input() showFlag: string = "";

  public async odjava() {
    this.avtentikacijaService.odjava();
  }
}

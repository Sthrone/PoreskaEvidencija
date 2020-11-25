import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Partner } from '../../../Klase/Partner';

@Component({
  selector: 'app-pretraga-partnera',
  templateUrl: './pretraga-partnera.component.html',
  styleUrls: ['./pretraga-partnera.component.scss']
})
export class PretragaPartneraComponent implements OnInit 
{
  @Input() sviPartneri: Partner[];
  @Output() pretrazeno = new EventEmitter();

  prozorPrikazan: boolean;
  prikazano: Partner[] = [];

  sifra_partnera: string;
  naziv: string;
  ulica: string;
  broj_objekta: string;
  postanski_broj: string;
  mesto: string;
  telefon: string;
  email: string;
  ime_vlasnika: string;
  prezime_vlasnika: string;
  pib: string;
  ziro_racun: string;
  maticni_broj: string;
  sifra_delatnosti: string;

  constructor(private translate: TranslateService) 
  { 
    this.prozorPrikazan = false;
  }

  ngOnInit() 
  {
    
  }


  ToggleSearch()
  {
    if (this.prozorPrikazan == false)
      this.prozorPrikazan = true;
    else
      this.prozorPrikazan = false;
  }


  Filtriraj()
  {
    this.prikazano = [];

    let sifra_partnera_rx = new RegExp(this.sifra_partnera, "i");
    let naziv_rx = new RegExp(this.naziv, "i");
    let ulica_rx = new RegExp(this.ulica, "i");
    let broj_objekta_rx = new RegExp(this.broj_objekta, "i");
    let postanski_broj_rx = new RegExp(this.postanski_broj, "i");
    let mesto_rx = new RegExp(this.mesto, "i");
    let telefon_rx = new RegExp(this.telefon, "i");
    let email_rx = new RegExp(this.email, "i");
    let ime_vlasnika_rx = new RegExp(this.ime_vlasnika, "i");
    let prezime_vlasnika_rx = new RegExp(this.prezime_vlasnika, "i");
    let pib_rx = new RegExp(this.pib, "i");
    let ziro_racun_rx = new RegExp(this.ziro_racun, "i");
    let maticni_broj_rx = new RegExp(this.maticni_broj, "i");
    let sifra_delatnosti_rx = new RegExp(this.sifra_delatnosti, "i");

    for (let i=0 ; i<this.sviPartneri.length ; i++)
    {
      if ((this.sifra_partnera != null) && (!sifra_partnera_rx.test(this.sviPartneri[i].sifra_partnera)))
        continue;

      if ((this.naziv != null) && (!naziv_rx.test(this.sviPartneri[i].naziv)))
        continue;
      
      if ((this.ulica != null) && (!ulica_rx.test(this.sviPartneri[i].ulica)))
        continue;
      
      if ((this.broj_objekta != null) && (!broj_objekta_rx.test(this.sviPartneri[i].broj_objekta)))
        continue;
      
      if ((this.postanski_broj != null) && (!postanski_broj_rx.test(this.sviPartneri[i].postanski_broj)))
        continue;

      if ((this.mesto != null) && (!mesto_rx.test(this.sviPartneri[i].mesto)))
        continue;

      if ((this.telefon != null) && (!telefon_rx.test(this.sviPartneri[i].telefon)))
        continue;

      if ((this.email != null) && (!email_rx.test(this.sviPartneri[i].email)))
        continue;
        
      if ((this.ime_vlasnika != null) && (!ime_vlasnika_rx.test(this.sviPartneri[i].ime_vlasnika)))
        continue;

      if ((this.prezime_vlasnika != null) && (!prezime_vlasnika_rx.test(this.sviPartneri[i].prezime_vlasnika)))
        continue;
      
      if ((this.pib != null) && (!pib_rx.test(this.sviPartneri[i].pib)))
        continue;

      if ((this.ziro_racun != null) && (!ziro_racun_rx.test(this.sviPartneri[i].ziro_racun)))
        continue;

      if ((this.maticni_broj != null) && (!maticni_broj_rx.test(this.sviPartneri[i].maticni_broj)))
        continue;
      
      if ((this.sifra_delatnosti != null) && (!sifra_delatnosti_rx.test(this.sviPartneri[i].sifra_delatnosti)))
        continue;


      this.prikazano.push(this.sviPartneri[i]);
    }

    this.pretrazeno.emit(this.prikazano);
  }

  

}

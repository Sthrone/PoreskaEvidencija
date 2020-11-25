import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Kir } from '../../../Klase/Kir';
import { Partner } from '../../../Klase/Partner';
import { PartnerInfoService } from '../../../Servisi/partner-info.service';

@Component({
  selector: 'app-pretraga-faktura',
  templateUrl: './pretraga-faktura.component.html',
  styleUrls: ['./pretraga-faktura.component.scss']
})
export class PretragaFakturaComponent implements OnInit, AfterViewInit
{
  @Input() sviRacuni: Kir[];
  @Output() pretrazeno = new EventEmitter();

  prozorPrikazan: boolean;
  prikazano: Kir[] = [];
  partneri: Partner[];

  godina: string;
  mesec: string;
  datum_od: Date;
  datum_do: Date;
  id_partnera: number;

  tip_pretrage: number;

  constructor
  (
    private partnerInfo: PartnerInfoService,
    private translate: TranslateService
  ) 
  { 
    this.prozorPrikazan = true;
    this.tip_pretrage = 1;

    let today = new Date();
    this.godina = today.getFullYear() + "";
    this.mesec = (today.getMonth() + 1) + "";
    //this.IzvrsiMesecnuPretragu();

    this.datum_od = null;
    this.datum_do = null;
  }

  ngOnInit() 
  {
    this.partnerInfo.VratiPartnereKorisnikaMinimalno(1).subscribe
    ((resp: any) =>
    {
      this.partneri = Partner.FromJSONToArray(resp);
    });
  }

  
  ngAfterViewInit()
  {
    this.IzvrsiMesecnuPretragu();
  }


  ToggleSearch()
  {
    if (this.prozorPrikazan == false)
      this.prozorPrikazan = true;
    else
      this.prozorPrikazan = false;
  }


  Pretrazi(tip: number)
  {
    if (tip == this.tip_pretrage)   // Trazi se pretraga
    {
      if (tip == 1)
        this.IzvrsiMesecnuPretragu();
      else
        this.IzvrsiNaprednuPretragu();
    }
    else                            // Trazi se promena tipa pretrage
      this.tip_pretrage = tip;
  }


  IzvrsiMesecnuPretragu()
  {
    this.prikazano = [];

    let m: string
    if (this.mesec.length == 1)
      m = "0" + this.mesec;
    else
      m = this.mesec;

    for (let i=0 ; i < this.sviRacuni.length ; i++)
    {
      let niz = this.sviRacuni[i].datum_knjizenja_isprave.split('.');

      if (this.godina != "" && this.godina != niz[2])
        continue;
      
      if (this.mesec != "" && m != niz[1])
        continue;
      
      this.prikazano.push(this.sviRacuni[i]);
    }

    this.pretrazeno.emit(this.prikazano);
  }


  IzvrsiNaprednuPretragu()
  {
    this.prikazano = [];
    
    let dod: number;
    let ddo: number;

    if (this.datum_od != null)
    {
      let pom = new Date(this.datum_od);
      dod = new Date(pom.getFullYear(), pom.getMonth(), pom.getDate()).getTime();
    }

    if (this.datum_do != null)
    {
      let pom = new Date(this.datum_do);
      ddo = new Date(pom.getFullYear(), pom.getMonth(), pom.getDate()).getTime();
    }

    for (let i=0 ; i < this.sviRacuni.length ; i++)
    {
      if (this.id_partnera != null && this.sviRacuni[i].id_partnera != this.id_partnera)
        continue;

      let niz = this.sviRacuni[i].datum_knjizenja_isprave.split('.');
      let dat = new Date(parseInt(niz[2]), parseInt(niz[1])-1, parseInt(niz[0])).getTime();

      if (this.datum_od != null && dat < dod)
        continue;

      if (this.datum_do != null && dat > ddo)
        continue;

      this.prikazano.push(this.sviRacuni[i]);
    }

    this.pretrazeno.emit(this.prikazano);
  }


}

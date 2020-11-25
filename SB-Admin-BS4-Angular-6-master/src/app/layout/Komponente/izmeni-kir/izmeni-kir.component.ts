import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Partner } from '../../../Klase/Partner';
import { Kir } from '../../../Klase/Kir';
import { PartnerInfoService } from '../../../Servisi/partner-info.service';
import { KirInfoService } from '../../../Servisi/kir-info.service';
import { DijalogComponent } from '../dijalog/dijalog.component';


@Component({
  selector: 'app-izmeni-kir',
  templateUrl: './izmeni-kir.component.html',
  styleUrls: ['./izmeni-kir.component.scss'],
  animations: [routerTransition()]
})
export class IzmeniKirComponent implements OnInit 
{
  kir: Kir;
  stareVrednosti: Kir;
  partneri: Partner[];

  sifraPartnera: string;
  pibPartnera: string;

  nazivGreska: string;
  datumKnjizenjaGreska: string;
  brojRacunaGreska: string;
  datumRacunaGreska: string;
  ukupnaNaknadaGreska: string;
  prometSaiBezPravaGreska: string;
  prometSaPravomGreska: string;
  osnovica20Greska: string;
  pdv20Greska: string;

  private dijalogRef: MatDialogRef<DijalogComponent>;

  constructor
  (
    private partnerInfo: PartnerInfoService,
    private kirInfo: KirInfoService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.route.params.subscribe(params => 
    {
      this.stareVrednosti = Kir.FromJSON(JSON.parse(params['racun']));
      this.kir = Kir.FromJSON(this.stareVrednosti);
    });
  }

  ngOnInit() 
  {
    this.sifraPartnera = "";
    this.pibPartnera = "";

    this.nazivGreska = "";
    this.datumKnjizenjaGreska = "";
    this.brojRacunaGreska = "";
    this.datumRacunaGreska = "";
    this.ukupnaNaknadaGreska = "";
    this.prometSaiBezPravaGreska = "";
    this.prometSaPravomGreska = "";
    this.osnovica20Greska = "";
    this.pdv20Greska = "";

    this.partnerInfo.VratiPartnereKorisnikaMinimalno(1).subscribe
    ((resp: any) =>
    {
      this.partneri = Partner.FromJSONToArray(resp);

      this.IzabranPartner();
    });
  }

  //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

  InicijalizujRacun()
  {
    this.kir = Kir.FromJSON(this.stareVrednosti);
    this.IzabranPartner();

    this.nazivGreska = "";
    this.datumKnjizenjaGreska = "";
    this.brojRacunaGreska = "";
    this.datumRacunaGreska = "";
    this.ukupnaNaknadaGreska = "";
    this.prometSaiBezPravaGreska = "";
    this.prometSaPravomGreska = "";
    this.osnovica20Greska = "";
    this.pdv20Greska = "";
  }


  IzabranPartner()
  {
    let index = this.partneri.findIndex(x => x.id_partnera == this.kir.id_partnera);
    this.sifraPartnera = this.partneri[index].sifra_partnera;
    this.pibPartnera = this.partneri[index].pib;

    this.nazivGreska = "";
  }


  DaniUMesecu(m, y)
  {
    switch (m) 
    {
      case 1 :
          return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
      case 8 : case 3 : case 5 : case 10 :
          return 30;
      default :
          return 31
    }
  }

  ProveraDatuma(datum: string): string
  {
    // Provera tacaka
    let niz = datum.split('.');
    if (niz.length != 3)
      return '_139';

    // Provera brojeva
    for (let i=0 ; i < 3 ; i++)
    { 
      if (isNaN(Number(niz[i])))
        return '_140';
    }

    // Provera velicina
    let d = parseInt(niz[0]);
    let m = parseInt(niz[1], 10) - 1;
    let y = parseInt(niz[2])
    
    if (y > 1970 && y < 2100 && m >= 0 && m < 12 && d > 0 && d <= this.DaniUMesecu(m, y))
      return '';
    
    return '_143';
  }
  
  ProveraGreske(kontrola: string)
  {
    switch (kontrola)
    {
      case 'naziv':
      {
        if (this.kir.id_partnera != null)
        {
          this.nazivGreska = "";
          return true;
        }
        
        this.nazivGreska = this.translate.instant('_55');
        return false;
      }
      case 'datum_knjizenja_isprave':
      {
        if (this.kir.datum_knjizenja_isprave != null && this.kir.datum_knjizenja_isprave.length >= 8 && this.kir.datum_knjizenja_isprave.length <= 11)
        {
          let greska = this.ProveraDatuma(this.kir.datum_knjizenja_isprave);
          if (greska != '')
          {
            this.datumKnjizenjaGreska = this.translate.instant(greska);
            return false;
          }

          this.datumKnjizenjaGreska = "";
          return true;
        }
        
        this.datumKnjizenjaGreska = this.translate.instant('_139');
        return false;
      }
      case 'broj_racuna':
      {
        if (this.kir.broj_racuna != null && this.kir.broj_racuna.length > 0)
        {
          this.brojRacunaGreska = "";
          return true;
        }
        
        this.brojRacunaGreska = this.translate.instant('_55');
        return false;
      }
      case 'datum_racuna':
      {
        if (this.kir.datum_racuna != null && this.kir.datum_racuna.length >= 8 && this.kir.datum_racuna.length <= 11)
        {
          let greska = this.ProveraDatuma(this.kir.datum_racuna);
          if (greska != '')
          {
            this.datumRacunaGreska = this.translate.instant(greska);
            return false;
          }

          this.datumRacunaGreska = "";
          return true;
        }
        
        this.datumRacunaGreska = this.translate.instant('_139');
        return false;
      }
      case 'ukupna_naknada_sa_pdv':
      {
        if (this.kir.ukupna_naknada_sa_pdv != null)
        {
          if (isNaN(Number(this.kir.ukupna_naknada_sa_pdv)))
          {
            this.ukupnaNaknadaGreska = this.translate.instant('_141');
            return false;
          }

          if (Number(this.kir.ukupna_naknada_sa_pdv < 0))
          {
            this.ukupnaNaknadaGreska = this.translate.instant('_142');
            return false;
          }
        
          this.ukupnaNaknadaGreska = "";
          this.prometSaiBezPravaGreska = "";
          this.prometSaPravomGreska = "";

          this.kir.ukupni_promet_sa_i_bez_prava_na_pdv = this.kir.ukupna_naknada_sa_pdv;
          this.kir.promet_sa_pravom_na_pdv = this.kir.ukupna_naknada_sa_pdv;

          return true;
        }
        
        this.ukupnaNaknadaGreska = this.translate.instant('_55');
        return false;
      }
      case 'ukupni_promet_sa_i_bez_prava_na_pdv':
      {
        if (this.kir.ukupni_promet_sa_i_bez_prava_na_pdv != null)
        {
          if (isNaN(Number(this.kir.ukupni_promet_sa_i_bez_prava_na_pdv)))
          {
            this.prometSaiBezPravaGreska = this.translate.instant('_141');
            return false;
          }

          this.prometSaiBezPravaGreska = "";
          return true;
        }
        
        this.prometSaiBezPravaGreska = this.translate.instant('_55');
        return false;
      }
      case 'promet_sa_pravom_na_pdv':
      {
        if (this.kir.promet_sa_pravom_na_pdv != null)
        {
          if (isNaN(Number(this.kir.promet_sa_pravom_na_pdv)))
          {
            this.prometSaPravomGreska = this.translate.instant('_141');
            return false;
          }
          
          this.prometSaPravomGreska = "";
          return true;
        }
        
        this.prometSaPravomGreska = this.translate.instant('_55');
        return false;
      }
      case 'osnovica_20':
      {
        if (this.kir.osnovica_20 != null)
        {
          if (isNaN(Number(this.kir.osnovica_20)))
          {
            this.osnovica20Greska = this.translate.instant('_141');
            return false;
          }
          
          this.osnovica20Greska = "";
          return true;
        }
        
        this.osnovica20Greska = this.translate.instant('_55');
        return false;
      }
      case 'pdv_20':
      {
        if (this.kir.pdv_20 != null)
        {
          if (isNaN(Number(this.kir.pdv_20)))
          {
            this.pdv20Greska = this.translate.instant('_141');
            return false;
          }
          
          this.pdv20Greska = "";
          return true;
        }
        
        this.pdv20Greska = this.translate.instant('_55');
        return false;
      }
      default:
        break;
    }
  }


  TransformisiDatum(datum: string): string
  {
    // Pretvaranje u format milisekundi.
    let niz = datum.split('.');
    let d = parseInt(niz[0]);
    let m = parseInt(niz[1]);
    let y = parseInt(niz[2]);

    let dat = y + "-";
    if (m < 10) dat += "0";
    dat += m + "-";
    if (d < 10) dat += "0";
    dat += d;

    return dat;
  }

  SacuvajIzmene()
  {
    let p1: boolean = this.ProveraGreske('naziv');
    let p2: boolean = this.ProveraGreske('datum_knjizenja_isprave');
    let p3: boolean = this.ProveraGreske('broj_racuna');
    let p4: boolean = this.ProveraGreske('datum_racuna');
    let p5: boolean = this.ProveraGreske('ukupna_naknada_sa_pdv');
    let p6: boolean = this.ProveraGreske('ukupni_promet_sa_i_bez_prava_na_pdv');
    let p7: boolean = this.ProveraGreske('promet_sa_pravom_na_pdv');
    let p8: boolean = this.ProveraGreske('osnovica_20');
    let p9: boolean = this.ProveraGreske('pdv_20');

    if (p1 && p2 && p3 && p4 && p5 && p6 && p7 && p8 && p9)
    {
      let tekst = this.translate.instant('_94');
      this.dijalogRef = this.dialog.open(DijalogComponent, { data: { tekst } });

      this.dijalogRef.afterClosed().subscribe((res) => 
      {
        if (res == true)
        {
          let pom: Kir = Kir.FromJSON(this.kir);

          pom.datum_knjizenja_isprave = this.TransformisiDatum(pom.datum_knjizenja_isprave);
          pom.datum_racuna = this.TransformisiDatum(pom.datum_racuna);
          
          this.kirInfo.IzmeniRacun(pom);
        }
        else
          this.toastr.info(this.translate.instant('_180'));
      });
    }
    
  }


  VratiStareVrednosti()
  {
    this.InicijalizujRacun();
  }


  Nazad()
  {
    this.router.navigate(['/kir/pregled']);
  }

}

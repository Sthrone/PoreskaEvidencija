import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Partner } from '../../../Klase/Partner';
import { Kpr } from '../../../Klase/Kpr';
import { PartnerInfoService } from '../../../Servisi/partner-info.service';
import { KprInfoService } from '../../../Servisi/kpr-info.service';
import { DijalogComponent } from '../dijalog/dijalog.component';

@Component({
  selector: 'app-kpr-unos',
  templateUrl: './kpr-unos.component.html',
  styleUrls: ['./kpr-unos.component.scss'],
  animations: [routerTransition()]
})
export class KprUnosComponent implements OnInit 
{
  kpr: Kpr;
  partneri: Partner[];

  sifraPartnera: string;
  pibPartnera: string;

  nazivGreska: string;
  datumKnjizenjaGreska: string;
  brojRacunaGreska: string;
  datumRacunaGreska: string;
  ukupnaNaknadaGreska: string;
  ukupanPrethodniGreska: string;
  mozeOdbitiGreska: string;
  poljoprivredniciDatum: string;

  private dijalogRef: MatDialogRef<DijalogComponent>;

  constructor
  (
    private partnerInfo: PartnerInfoService,
    private kprInfo: KprInfoService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) 
  { 
    this.InicijalizujRacun();
  }

  ngOnInit() 
  {
    this.partnerInfo.VratiPartnereKorisnikaMinimalno(2).subscribe
    ((resp: any) =>
    {
      this.partneri = Partner.FromJSONToArray(resp);
    });
  }

  //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

  InicijalizujRacun()
  {
    this.kpr = new Kpr();

    let today = new Date();
    let datum = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();

    this.kpr.datum_knjizenja_isprave = datum;
    this.kpr.datum_racuna = datum;
    this.kpr.ukupna_naknada_sa_pdv = 0.00;
    this.kpr.ukupan_iznos_obracunatog_prethodnog_pdv = 0.00;
    this.kpr.iznos_prethodnog_pdv_koji_se_moze_odbiti = 0.00;
    this.kpr.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = 0.00;
    this.kpr.oslobodjena_nabavka = 0.00;
    this.kpr.nabavka_od_lica_koja_nisu_obveznici_pdv = 0.00;
    this.kpr.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = 0.00;
    this.kpr.vrednost_uvoza_bez_pdv = 0.00;
    this.kpr.iznos_pdv = 0.00;
    this.kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku = "";
    this.kpr.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = 0.00;
    this.kpr.iznos_naknade_od_5_poljoprivredniku = 0.00;

    this.sifraPartnera = "";
    this.pibPartnera = "";

    this.nazivGreska = "";
    this.datumKnjizenjaGreska = "";
    this.brojRacunaGreska = "";
    this.datumRacunaGreska = "";
    this.ukupnaNaknadaGreska = "";
    this.ukupanPrethodniGreska = "";
    this.mozeOdbitiGreska = "";
    this.poljoprivredniciDatum = "";
  }


  IzabranPartner()
  {
    let index = this.partneri.findIndex(x => x.id_partnera == this.kpr.id_partnera);
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
        if (this.kpr.id_partnera != null)
        {
          this.nazivGreska = "";
          return true;
        }
        
        this.nazivGreska = this.translate.instant('_55');
        return false;
      }
      case 'datum_knjizenja_isprave':
      {
        if (this.kpr.datum_knjizenja_isprave != null && this.kpr.datum_knjizenja_isprave.length >= 8 && this.kpr.datum_knjizenja_isprave.length <= 11)
        {
          let greska = this.ProveraDatuma(this.kpr.datum_knjizenja_isprave);
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
        if (this.kpr.broj_racuna != null && this.kpr.broj_racuna.length > 0)
        {
          this.brojRacunaGreska = "";
          return true;
        }
        
        this.brojRacunaGreska = this.translate.instant('_55');
        return false;
      }
      case 'datum_racuna':
      {
        if (this.kpr.datum_racuna != null && this.kpr.datum_racuna.length >= 8 && this.kpr.datum_racuna.length <= 11)
        {
          let greska = this.ProveraDatuma(this.kpr.datum_racuna);
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
        if (this.kpr.ukupna_naknada_sa_pdv != null)
        {
          if (isNaN(Number(this.kpr.ukupna_naknada_sa_pdv)))
          {
            this.ukupnaNaknadaGreska = this.translate.instant('_141');
            return false;
          }

          if (Number(this.kpr.ukupna_naknada_sa_pdv < 0))
          {
            this.ukupnaNaknadaGreska = this.translate.instant('_142');
            return false;
          }
        
          this.ukupnaNaknadaGreska = "";
          return true;
        }
        
        this.ukupnaNaknadaGreska = this.translate.instant('_55');
        return false;
      }
      case 'ukupan_iznos_obracunatog_prethodnog_pdv':
      {
        if (this.kpr.ukupan_iznos_obracunatog_prethodnog_pdv != null)
        {
          if (isNaN(Number(this.kpr.ukupan_iznos_obracunatog_prethodnog_pdv)))
          {
            this.ukupanPrethodniGreska = this.translate.instant('_141');
            return false;
          }
        
          this.ukupanPrethodniGreska = "";
          this.mozeOdbitiGreska = "";
          this.kpr.iznos_prethodnog_pdv_koji_se_moze_odbiti = this.kpr.ukupan_iznos_obracunatog_prethodnog_pdv;
          return true;
        }
        
        this.ukupanPrethodniGreska = this.translate.instant('_55');
        return false;
      }
      case 'iznos_prethodnog_pdv_koji_se_moze_odbiti':
      {
        if (this.kpr.iznos_prethodnog_pdv_koji_se_moze_odbiti != null)
        {
          if (isNaN(Number(this.kpr.iznos_prethodnog_pdv_koji_se_moze_odbiti)))
          {
            this.mozeOdbitiGreska = this.translate.instant('_141');
            return false;
          }
        
          this.mozeOdbitiGreska = "";
          return true;
        }
        
        this.mozeOdbitiGreska = this.translate.instant('_55');
        return false;
      }
      case 'datum_placanja_pri_uvozu_placanje_poljoprivredniku':
      {
        if (this.kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku != "")
        {
          if (this.kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku != null && this.kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku.length >= 8 && this.kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku.length <= 11)
          {
            let greska = this.ProveraDatuma(this.kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku);
            if (greska != '')
            {
              this.poljoprivredniciDatum = this.translate.instant(greska);
              return false;
            }

            this.poljoprivredniciDatum = "";
            return true;
          }
          
          this.poljoprivredniciDatum = this.translate.instant('_139');
          return false;
        }

        this.poljoprivredniciDatum = "";
        return true;
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

  NapraviRacun()
  {
    let p1: boolean = this.ProveraGreske('naziv');
    let p2: boolean = this.ProveraGreske('datum_knjizenja_isprave');
    let p3: boolean = this.ProveraGreske('broj_racuna');
    let p4: boolean = this.ProveraGreske('datum_racuna');
    let p5: boolean = this.ProveraGreske('ukupna_naknada_sa_pdv');
    let p6: boolean = this.ProveraGreske('ukupan_iznos_obracunatog_prethodnog_pdv');
    let p7: boolean = this.ProveraGreske('iznos_prethodnog_pdv_koji_se_moze_odbiti');
    let p8: boolean = this.ProveraGreske('datum_placanja_pri_uvozu_placanje_poljoprivredniku');

    if (p1 && p2 && p3 && p4 && p5 && p6 && p7 && p8)
    {
      let tekst = this.translate.instant('_144');
      this.dijalogRef = this.dialog.open(DijalogComponent, { data: { tekst } });

      this.dijalogRef.afterClosed().subscribe((res) => 
      {
        if (res == true)
        {
          let pom: Kpr = Kpr.FromJSON(this.kpr);

          pom.datum_knjizenja_isprave = this.TransformisiDatum(pom.datum_knjizenja_isprave);
          pom.datum_racuna = this.TransformisiDatum(pom.datum_racuna);
          
          if (pom.datum_placanja_pri_uvozu_placanje_poljoprivredniku != "")
            pom.datum_placanja_pri_uvozu_placanje_poljoprivredniku = this.TransformisiDatum(pom.datum_placanja_pri_uvozu_placanje_poljoprivredniku);
          
          this.kprInfo.DodajRacun(pom);
        }
        else
          this.toastr.info(this.translate.instant('_145'));
      });
    }
    
  }


  OcistiPolja()
  {
    this.InicijalizujRacun();
  }


}

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TooltipPosition } from '@angular/material';

import { Kpr } from '../../../Klase/Kpr';
import { KprInfoService } from '../../../Servisi/kpr-info.service';
import { SpinnerService } from '../../../Servisi/spinner.service';
import { DijalogComponent } from '../dijalog/dijalog.component';

@Component({
  selector: 'app-kpr-pregled',
  templateUrl: './kpr-pregled.component.html',
  styleUrls: ['./kpr-pregled.component.scss'],
  animations: [routerTransition()]
})
export class KprPregledComponent implements OnInit 
{
  @ViewChild('content') content: ElementRef;
  @Input('matTooltipPosition') position: TooltipPosition = "below";

  sviRacuni: Kpr[];
  prikazaniRacuni: Kpr[];
  kolone: boolean[] = [];
  suma: Kpr;

  stampa: boolean;
  today: number = Date.now();

  private dijalogRef: MatDialogRef<DijalogComponent>;

  constructor
  (
    private kprInfo: KprInfoService,
    private spinner: SpinnerService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) 
  { }


  ngOnInit() 
  {
    this.stampa = false;
    this.kprInfo.VratiPrimljeneRacuneKorisnika().subscribe
    ((resp: any) =>
    {
      this.sviRacuni = Kpr.FromJSONToArrayxPartner(resp);

      this.prikazaniRacuni = [];
      for (let i=0 ; i < this.sviRacuni.length ; i++)
        this.prikazaniRacuni.push(this.sviRacuni[i]);

      this.OdrediSume();
    });

    // kprKolone
    if (localStorage['kprKolone'] != null)
    {
      let sacuvaneKolone = localStorage['kprKolone'].split(',');

      for (let i=0 ; i < sacuvaneKolone.length ; i++)
      {
        if (sacuvaneKolone[i] == "true")
          this.kolone[i] = true;
        else
          this.kolone[i] = false;
      }
    }
    else
    {
      for (let i=0 ; i < 19 ; i++)
        this.kolone[i] = true;
    }
  }


  IzvrsenaPretraga(filtriraniRacuni)
  {
    this.prikazaniRacuni = filtriraniRacuni;
    this.OdrediSume();
  }


  IzmenjeneKolone(filtriraneKolone)
  {
    this.kolone = filtriraneKolone;
    localStorage['kprKolone'] = this.kolone;
  }


  OdrediSume()
  {
    this.suma = new Kpr();
    this.suma.redni_broj = 0;
    this.suma.ukupna_naknada_sa_pdv = 0;
    this.suma.ukupan_iznos_obracunatog_prethodnog_pdv = 0;
    this.suma.iznos_prethodnog_pdv_koji_se_moze_odbiti = 0;
    this.suma.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = 0;
    this.suma.oslobodjena_nabavka = 0;
    this.suma.nabavka_od_lica_koja_nisu_obveznici_pdv = 0;
    this.suma.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = 0;
    this.suma.vrednost_uvoza_bez_pdv = 0;
    this.suma.iznos_pdv = 0;
    this.suma.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = 0;
    this.suma.iznos_naknade_od_5_poljoprivredniku = 0;

    for (let i=0 ; i < this.prikazaniRacuni.length ; i++)
    {
      this.suma.redni_broj++;
      this.suma.ukupna_naknada_sa_pdv += this.prikazaniRacuni[i].ukupna_naknada_sa_pdv;
      this.suma.ukupan_iznos_obracunatog_prethodnog_pdv += this.prikazaniRacuni[i].ukupan_iznos_obracunatog_prethodnog_pdv;
      this.suma.iznos_prethodnog_pdv_koji_se_moze_odbiti += this.prikazaniRacuni[i].iznos_prethodnog_pdv_koji_se_moze_odbiti;
      this.suma.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti += this.prikazaniRacuni[i].iznos_prethodnog_pdv_koji_se_ne_moze_odbiti;
      this.suma.oslobodjena_nabavka += this.prikazaniRacuni[i].oslobodjena_nabavka;
      this.suma.nabavka_od_lica_koja_nisu_obveznici_pdv += this.prikazaniRacuni[i].nabavka_od_lica_koja_nisu_obveznici_pdv;
      this.suma.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv += this.prikazaniRacuni[i].naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv;
      this.suma.vrednost_uvoza_bez_pdv += this.prikazaniRacuni[i].vrednost_uvoza_bez_pdv;
      this.suma.iznos_pdv += this.prikazaniRacuni[i].iznos_pdv;
      this.suma.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika += this.prikazaniRacuni[i].vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika;
      this.suma.iznos_naknade_od_5_poljoprivredniku += this.prikazaniRacuni[i].iznos_naknade_od_5_poljoprivredniku;
    }

    this.suma.ukupna_naknada_sa_pdv = parseFloat(this.suma.ukupna_naknada_sa_pdv.toFixed(2));
    this.suma.ukupan_iznos_obracunatog_prethodnog_pdv = parseFloat(this.suma.ukupan_iznos_obracunatog_prethodnog_pdv.toFixed(2));
    this.suma.iznos_prethodnog_pdv_koji_se_moze_odbiti = parseFloat(this.suma.iznos_prethodnog_pdv_koji_se_moze_odbiti.toFixed(2));
    this.suma.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = parseFloat(this.suma.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti.toFixed(2));
    this.suma.oslobodjena_nabavka = parseFloat(this.suma.oslobodjena_nabavka.toFixed(2));
    this.suma.nabavka_od_lica_koja_nisu_obveznici_pdv = parseFloat(this.suma.nabavka_od_lica_koja_nisu_obveznici_pdv.toFixed(2));
    this.suma.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = parseFloat(this.suma.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv.toFixed(2));
    this.suma.vrednost_uvoza_bez_pdv = parseFloat(this.suma.vrednost_uvoza_bez_pdv.toFixed(2));
    this.suma.iznos_pdv = parseFloat(this.suma.iznos_pdv.toFixed(2));
    this.suma.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = parseFloat(this.suma.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika.toFixed(2));
    this.suma.iznos_naknade_od_5_poljoprivredniku = parseFloat(this.suma.iznos_naknade_od_5_poljoprivredniku.toFixed(2));
  }


  PreuzmiPDF()
  {
    this.spinner.SetLoaderState(true);

    let size = 7;
    for (let i=0 ; i < this.kolone.length ; i++)
    {
      if (this.kolone[i] == false)
        size++;
    }

    if (size >= 15)
      size += 4;
    else if (size >= 13)
      size += 2;
    else if (size >= 11)
      size += 1;

    this.stampa = true;
    
    let name = this.translate.instant('_15');

    this.spinner.SetLoaderState(false);
    xepOnline.Formatter.Format('content', {render: 'download', cssStyle:[{fontSize: size + 'px'}], filename: name, pageWidth:'297mm', pageHeight:'210mm'});

    this.stampa = false;
  }


  ZatvoriStampu()
  {
    this.stampa = false;
  }


  IzmeniRacun(racun: Kpr)
  {
    this.router.navigate(['/kpr/izmena', {racun: JSON.stringify(racun)}]);
  }


  ObrisiRacun(racun: Kpr)
  {
    let tekst = this.translate.instant('_183');
    tekst += racun.broj_racuna;
    tekst += this.translate.instant('_184');

    this.dijalogRef = this.dialog.open(DijalogComponent, { data: { tekst } });

    this.dijalogRef.afterClosed().subscribe((res) => 
    {
      if (res == true)
      {
        this.spinner.SetLoaderState(true);

        this.kprInfo.ObrisiRacun(racun.id_kpr).subscribe
        (
          (resp: any)=>
          {
            this.sviRacuni = this.sviRacuni.filter(x => x.id_kpr != racun.id_kpr);
            this.prikazaniRacuni = this.prikazaniRacuni.filter(x => x.id_kpr != racun.id_kpr);
            this.OdrediSume();

            this.spinner.SetLoaderState(false);
            this.toastr.success(this.translate.instant('_185') + racun.broj_racuna + this.translate.instant('_186'));    
          },
          (errorResp: any) =>
          {
            this.spinner.SetLoaderState(false);
            this.toastr.error(this.translate.instant('_187'));
          }
        );
      }
      else
        this.toastr.info(this.translate.instant('_188'));
    });
  }


}

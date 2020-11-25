import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TooltipPosition } from '@angular/material';

import { Kir } from '../../../Klase/Kir';
import { KirInfoService } from '../../../Servisi/kir-info.service';
import { SpinnerService } from '../../../Servisi/spinner.service';
import { DijalogComponent } from '../dijalog/dijalog.component';

@Component({
  selector: 'app-kir-pregled',
  templateUrl: './kir-pregled.component.html',
  styleUrls: ['./kir-pregled.component.scss'],
  animations: [routerTransition()]
})
export class KirPregledComponent implements OnInit 
{
  @ViewChild('content') content: ElementRef;
  @Input('matTooltipPosition') position: TooltipPosition = "below";

  sviRacuni: Kir[];
  prikazaniRacuni: Kir[];
  kolone: boolean[] = [];
  suma: Kir;

  stampa: boolean;
  today: number = Date.now();

  private dijalogRef: MatDialogRef<DijalogComponent>;

  constructor
  (
    private kirInfo: KirInfoService,
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
    this.kirInfo.VratiIzdateRacuneKorisnika().subscribe
    ((resp: any) =>
    {
      this.sviRacuni = Kir.FromJSONToArrayxPartner(resp);

      this.prikazaniRacuni = [];
      for (let i=0 ; i < this.sviRacuni.length ; i++)
        this.prikazaniRacuni.push(this.sviRacuni[i]);

      this.OdrediSume();
    });

    // kirKolone
    if (localStorage['kirKolone'] != null)
    {
      let sacuvaneKolone = localStorage['kirKolone'].split(',');

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
      for (let i=0 ; i < 18 ; i++)
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
    localStorage['kirKolone'] = this.kolone;
  }


  OdrediSume()
  {
    this.suma = new Kir();
    this.suma.redni_broj = 0;
    this.suma.ukupna_naknada_sa_pdv = 0;
    this.suma.ukupni_promet_sa_i_bez_prava_na_pdv = 0;
    this.suma.promet_sa_pravom_na_pdv = 0;
    this.suma.osnovica_20 = 0;
    this.suma.pdv_20 = 0;
    this.suma.osnovica_10 = 0;
    this.suma.pdv_10 = 0;
    this.suma.oslobodjeni_promet_sa_odbitkom = 0;
    this.suma.oslobodjeni_promet_bez_odbitka = 0;
    this.suma.promet_u_inostranstvu_sa_pravom_na_odbitak = 0;
    this.suma.promet_u_inostranstvu_bez_naknade = 0;

    for (let i=0 ; i < this.prikazaniRacuni.length ; i++)
    {
      this.suma.redni_broj++;
      this.suma.ukupna_naknada_sa_pdv += this.prikazaniRacuni[i].ukupna_naknada_sa_pdv;
      this.suma.ukupni_promet_sa_i_bez_prava_na_pdv += this.prikazaniRacuni[i].ukupni_promet_sa_i_bez_prava_na_pdv;
      this.suma.promet_sa_pravom_na_pdv += this.prikazaniRacuni[i].promet_sa_pravom_na_pdv;
      this.suma.osnovica_20 += this.prikazaniRacuni[i].osnovica_20;
      this.suma.pdv_20 += this.prikazaniRacuni[i].pdv_20;
      this.suma.osnovica_10 += this.prikazaniRacuni[i].osnovica_10;
      this.suma.pdv_10 += this.prikazaniRacuni[i].pdv_10;
      this.suma.oslobodjeni_promet_sa_odbitkom += this.prikazaniRacuni[i].oslobodjeni_promet_sa_odbitkom;
      this.suma.oslobodjeni_promet_bez_odbitka += this.prikazaniRacuni[i].oslobodjeni_promet_bez_odbitka;
      this.suma.promet_u_inostranstvu_sa_pravom_na_odbitak += this.prikazaniRacuni[i].promet_u_inostranstvu_sa_pravom_na_odbitak;
      this.suma.promet_u_inostranstvu_bez_naknade += this.prikazaniRacuni[i].promet_u_inostranstvu_bez_naknade;
    }

    this.suma.ukupna_naknada_sa_pdv = parseFloat(this.suma.ukupna_naknada_sa_pdv.toFixed(2)); 
    this.suma.ukupni_promet_sa_i_bez_prava_na_pdv = parseFloat(this.suma.ukupni_promet_sa_i_bez_prava_na_pdv.toFixed(2)); 
    this.suma.promet_sa_pravom_na_pdv = parseFloat(this.suma.promet_sa_pravom_na_pdv.toFixed(2)); 
    this.suma.osnovica_20 = parseFloat(this.suma.osnovica_20.toFixed(2)); 
    this.suma.pdv_20 = parseFloat(this.suma.pdv_20.toFixed(2)); 
    this.suma.osnovica_10 = parseFloat(this.suma.osnovica_10.toFixed(2)); 
    this.suma.pdv_10 = parseFloat(this.suma.pdv_10.toFixed(2)); 
    this.suma.oslobodjeni_promet_sa_odbitkom = parseFloat(this.suma.oslobodjeni_promet_sa_odbitkom.toFixed(2)); 
    this.suma.oslobodjeni_promet_bez_odbitka = parseFloat(this.suma.oslobodjeni_promet_bez_odbitka.toFixed(2)); 
    this.suma.promet_u_inostranstvu_sa_pravom_na_odbitak = parseFloat(this.suma.promet_u_inostranstvu_sa_pravom_na_odbitak.toFixed(2)); 
    this.suma.promet_u_inostranstvu_bez_naknade = parseFloat(this.suma.promet_u_inostranstvu_bez_naknade.toFixed(2)); 
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
    
    let name = this.translate.instant('_18');

    this.spinner.SetLoaderState(false);
    xepOnline.Formatter.Format('content', {render: 'download', cssStyle:[{fontSize: size + 'px'}], filename: name, pageWidth:'297mm', pageHeight:'210mm'});

    this.stampa = false;
  }


  ZatvoriStampu()
  {
    this.stampa = false;
  }


  IzmeniRacun(racun: Kir)
  {
    this.router.navigate(['/kir/izmena', {racun: JSON.stringify(racun)}]);
  }


  ObrisiRacun(racun: Kir)
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

        this.kirInfo.ObrisiRacun(racun.id_kir).subscribe
        (
          (resp: any)=>
          {
            this.sviRacuni = this.sviRacuni.filter(x => x.id_kir != racun.id_kir);
            this.prikazaniRacuni = this.prikazaniRacuni.filter(x => x.id_kir != racun.id_kir);
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

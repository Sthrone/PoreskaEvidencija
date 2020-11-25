import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Partner } from '../../../Klase/Partner';
import { PartnerInfoService } from '../../../Servisi/partner-info.service';
import { SpinnerService } from '../../../Servisi/spinner.service';
import { DijalogComponent } from '../dijalog/dijalog.component';

@Component({
  selector: 'app-pregled-kupaca',
  templateUrl: './pregled-kupaca.component.html',
  styleUrls: ['./pregled-kupaca.component.scss'],
  animations: [routerTransition()]
})
export class PregledKupacaComponent implements OnInit 
{
  @ViewChild('content') content: ElementRef;

  sviKupci: Partner[];
  prikazaniKupci: Partner[];
  kolone: boolean[] = [];

  stampa: boolean;
  today: number = Date.now();

  private dijalogRef: MatDialogRef<DijalogComponent>;

  constructor
  (
    private partnerInfo: PartnerInfoService,
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

    this.partnerInfo.VratiPartnereKorisnika(1).subscribe
    ((resp: any) =>
    {
      this.sviKupci = Partner.FromJSONToArray(resp);

      this.prikazaniKupci = [];
      for (let i=0 ; i < this.sviKupci.length ; i++)
        this.prikazaniKupci.push(this.sviKupci[i]);
    });

    // kupciKolone
    if (localStorage['kupciKolone'] != null)
    {
      let sacuvaneKolone = localStorage['kupciKolone'].split(',');

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
      for (let i=0 ; i < 9 ; i++)
        this.kolone[i] = true;
    }

  }


  IzvrsenaPretraga(filtriraniPartneri)
  {
    this.prikazaniKupci = filtriraniPartneri;
  }


  IzmenjeneKolone(filtriraneKolone)
  {
    this.kolone = filtriraneKolone;
    localStorage['kupciKolone'] = this.kolone;
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

    if (size >= 12)
      size += 4;
    else if (size >= 10)
      size += 2;
    else if (size >= 8)
      size += 1;

    this.stampa = true;

    let name = this.translate.instant('_9');

    this.spinner.SetLoaderState(false);
    xepOnline.Formatter.Format('content', {render: 'download', cssStyle:[{fontSize: size + 'px'}], filename: name});

    this.stampa = false;
  }


  ZatvoriStampu()
  {
    this.stampa = false;
  }


  IzmeniKupca(kupac: Partner)
  {
    this.router.navigate(['/kupci/izmena', {kupac: JSON.stringify(kupac)}]);
  }


  ObrisiKupca(kupac: Partner)
  {
    let tekst = this.translate.instant('_100');
    tekst += kupac.naziv;
    tekst += this.translate.instant('_101');

    this.dijalogRef = this.dialog.open(DijalogComponent, { data: { tekst } });

    this.dijalogRef.afterClosed().subscribe((res) => 
    {
      if (res == true)
      {
        this.spinner.SetLoaderState(true);

        this.partnerInfo.ObrisiPartnera(kupac.id_partnera).subscribe
        (
          (resp: any)=>
          {
            this.sviKupci = this.sviKupci.filter(x => x.id_partnera != kupac.id_partnera);
            this.prikazaniKupci = this.prikazaniKupci.filter(x => x.id_partnera != kupac.id_partnera);

            this.spinner.SetLoaderState(false);
            this.toastr.success(this.translate.instant('_103') + kupac.naziv + this.translate.instant('_104'));    
          },
          (errorResp: any) =>
          {
            this.spinner.SetLoaderState(false);
            this.toastr.error(this.translate.instant('_105'));
          }
        );
      }
      else
        this.toastr.info(this.translate.instant('_102'));
    });
  }

}

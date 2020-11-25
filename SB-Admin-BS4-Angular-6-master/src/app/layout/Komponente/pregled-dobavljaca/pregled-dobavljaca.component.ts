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
  selector: 'app-pregled-dobavljaca',
  templateUrl: './pregled-dobavljaca.component.html',
  styleUrls: ['./pregled-dobavljaca.component.scss'],
  animations: [routerTransition()]
})
export class PregledDobavljacaComponent implements OnInit 
{
  @ViewChild('content') content: ElementRef;

  sviDobavljaci: Partner[];
  prikazaniDobavljaci: Partner[];
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

    this.partnerInfo.VratiPartnereKorisnika(2).subscribe
    ((resp: any) =>
    {
      this.sviDobavljaci = Partner.FromJSONToArray(resp);

      this.prikazaniDobavljaci = [];
      for (let i=0 ; i < this.sviDobavljaci.length ; i++)
        this.prikazaniDobavljaci.push(this.sviDobavljaci[i]);
    });

    // kupciKolone
    if (localStorage['dobavljaciKolone'] != null)
    {
      let sacuvaneKolone = localStorage['dobavljaciKolone'].split(',');

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
      for (let i=0 ; i < 10 ; i++)
        this.kolone[i] = true;
    }

  }


  IzvrsenaPretraga(filtriraniPartneri)
  {
    this.prikazaniDobavljaci = filtriraniPartneri;
  }


  IzmenjeneKolone(filtriraneKolone)
  {
    this.kolone = filtriraneKolone;
    localStorage['dobavljaciKolone'] = this.kolone;
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

    let name = this.translate.instant('_12');

    this.spinner.SetLoaderState(false);
    xepOnline.Formatter.Format('content', {render: 'download', cssStyle:[{fontSize: size + 'px'}], filename: name});

    this.stampa = false;
  }


  ZatvoriStampu()
  {
    this.stampa = false;
  }


  IzmeniDobavljaca(dobavljac: Partner)
  {
    this.router.navigate(['/dobavljaci/izmena', {dobavljac: JSON.stringify(dobavljac)}]);
  }


  ObrisiDobavljaca(dobavljac: Partner)
  {
    let tekst = this.translate.instant('_108');
    tekst += dobavljac.naziv;
    tekst += this.translate.instant('_109');

    this.dijalogRef = this.dialog.open(DijalogComponent, { data: { tekst } });

    this.dijalogRef.afterClosed().subscribe((res) => 
    {
      if (res == true)
      {
        this.spinner.SetLoaderState(true);

        this.partnerInfo.ObrisiPartnera(dobavljac.id_partnera).subscribe
        (
          (resp: any)=>
          {
            this.sviDobavljaci = this.sviDobavljaci.filter(x => x.id_partnera != dobavljac.id_partnera);
            this.prikazaniDobavljaci = this.prikazaniDobavljaci.filter(x => x.id_partnera != dobavljac.id_partnera);

            this.spinner.SetLoaderState(false);
            this.toastr.success(this.translate.instant('_110') + dobavljac.naziv + this.translate.instant('_111'));    
          },
          (errorResp: any) =>
          {
            this.spinner.SetLoaderState(false);
            this.toastr.error(this.translate.instant('_112'));
          }
        );
      }
      else
        this.toastr.info(this.translate.instant('_113'));
    });
  }

}

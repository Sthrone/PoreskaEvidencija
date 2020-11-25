import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { TooltipPosition } from '@angular/material';

import { Poreska_prijava } from '../../../Klase/Poreska_prijava';
import { PoreskaPrijavaService } from '../../../Servisi/poreska-prijava.service';
import { SpinnerService } from '../../../Servisi/spinner.service';

@Component({
  selector: 'app-pppdv',
  templateUrl: './pppdv.component.html',
  styleUrls: ['./pppdv.component.scss'],
  animations: [routerTransition()]
})
export class PppdvComponent implements OnInit 
{
  pp: Poreska_prijava;
  
  dodatnaNaknada: number;
  ostalo: number;
  ostaloZbir: number;

  godina: number;
  mesec: number;

  godinaGreska: string;
  mesecGreska: string;

  @Input('matTooltipPosition') position: TooltipPosition = "above";

  constructor
  (
    private poreskaPrijava: PoreskaPrijavaService,
    private spinner: SpinnerService,
    private translate: TranslateService
  ) 
  { 

  }

  ngOnInit() 
  {
    this.pp = null;
    this.dodatnaNaknada = 0;

    let dat = new Date();
    this.godina = dat.getFullYear();
    this.mesec = dat.getMonth() + 1;

    this.GenerisiDokument();
  }


  ProveraGreske(kontrola: string)
  {
    switch (kontrola)
    {
      case 'godina':
      {
        if (this.godina != null)
        {
          if (isNaN(Number(this.godina)))
          {
            this.godinaGreska = this.translate.instant('_141');
            return false;
          }

          if (Number(this.godina < 1970) || Number(this.godina > 2100))
          {
            this.godinaGreska = this.translate.instant('_220');
            return false;
          }
        
          this.godinaGreska = "";
          return true;
        }
        
        this.godinaGreska = this.translate.instant('_55');
        return false;
      }
      case 'mesec':
      {
        if (this.mesec != null)
        {
          if (isNaN(Number(this.mesec)))
          {
            this.mesecGreska = this.translate.instant('_141');
            return false;
          }

          if (Number(this.mesec < 1) || Number(this.mesec > 12))
          {
            this.mesecGreska = this.translate.instant('_220');
            return false;
          }
        
          this.mesecGreska = "";
          return true;
        }
        
        this.mesecGreska = this.translate.instant('_55');
        return false;
      }
      default:
        break;
    }
  }


  GenerisiDokument()
  {
    let p1: boolean = this.ProveraGreske('godina');
    let p2: boolean = this.ProveraGreske('mesec');

    if (p1 && p2)
    {
      this.poreskaPrijava.NapraviPrijavu(this.godina, this.mesec).subscribe((resp) =>
      {
        this.pp = Poreska_prijava.FromJSON(resp);

        this.dodatnaNaknada = 0;
        this.ostalo = this.pp.ostalo_bpdv;
        this.ostaloZbir = this.pp.zbir_porez_bpdv;
      });
    }
  }


  PreuzmiPDF()
  {
    this.spinner.SetLoaderState(true);

    let size = 12;    
    let name = this.translate.instant('_217');

    this.spinner.SetLoaderState(false);

    xepOnline.Formatter.Format('content', {render: 'download', cssStyle:[{fontSize: size + 'px'}], filename: name, pageWidth:'210mm', pageHeight:'297mm'});
  }


  PromenaDodatneNaknade()
  {
    this.dodatnaNaknada = parseInt(this.dodatnaNaknada.toFixed(0));
    this.pp.ostalo_bpdv = this.ostalo + this.dodatnaNaknada;
    this.pp.zbir_porez_bpdv = this.pp.uvoz_bpdv + this.pp.polj_bpdv + this.pp.ostalo_bpdv;
  }

}

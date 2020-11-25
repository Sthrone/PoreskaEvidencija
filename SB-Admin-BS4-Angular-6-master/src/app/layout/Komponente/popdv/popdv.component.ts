import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';

import { Poreska_prijava } from '../../../Klase/Poreska_prijava';
import { Obracun } from '../../../Klase/Obracun';
import { PoreskaPrijavaService } from '../../../Servisi/poreska-prijava.service';
import { SpinnerService } from '../../../Servisi/spinner.service';

@Component({
  selector: 'app-popdv',
  templateUrl: './popdv.component.html',
  styleUrls: ['./popdv.component.scss'],
  animations: [routerTransition()]
})
export class PopdvComponent implements OnInit 
{
  pp: Poreska_prijava;
  obr: Obracun;

  godina: number;
  mesec: number;

  godinaGreska: string;
  mesecGreska: string;

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
        this.obr = Obracun.PopuniObracun(this.pp);
      });
    }
  }


  PreuzmiPDF()
  {
    this.spinner.SetLoaderState(true);

    let dat = new Date();
    let dmg = " (" + dat.getDate() + "." + (dat.getMonth() + 1) + "." + dat.getFullYear() + ")";

    let size = 13;    
    let name = this.translate.instant('_256') + dmg;

    this.spinner.SetLoaderState(false);

    xepOnline.Formatter.Format('content', {render: 'download', cssStyle:[{fontSize: size + 'px'}], filename: name, pageWidth:'210mm', pageHeight:'297mm', pageMargin: '0.4in'});
  }

}

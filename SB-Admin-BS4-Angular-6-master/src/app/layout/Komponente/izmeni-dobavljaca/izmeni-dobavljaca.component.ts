import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Partner } from '../../../Klase/Partner';
import { PartnerInfoService } from '../../../Servisi/partner-info.service';
import { DijalogComponent } from '../dijalog/dijalog.component';

@Component({
  selector: 'app-izmeni-dobavljaca',
  templateUrl: './izmeni-dobavljaca.component.html',
  styleUrls: ['./izmeni-dobavljaca.component.scss'],
  animations: [routerTransition()]
})
export class IzmeniDobavljacaComponent implements OnInit 
{
  p: Partner;
  stareVrednosti: Partner;
  
  sifraGreska: string;
  nazivGreska: string;
  mestoGreska: string;
  pibGreska: string;

  private dijalogRef: MatDialogRef<DijalogComponent>;

  constructor
  (
    private partnerInfo: PartnerInfoService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  { 
    this.route.params.subscribe(params => 
    {
      this.stareVrednosti = Partner.FromJSON(JSON.parse(params['dobavljac']));
      this.p = Partner.CopyPartner(this.stareVrednosti);
    });

    this.sifraGreska = "";
    this.nazivGreska = "";
    this.mestoGreska = "";
    this.pibGreska = "";
  }

  ngOnInit() 
  {

  }

  //-------------- Greske ----------------

  ProveraGreske(kontrola: string)
  {
    switch (kontrola)
    {
      case 'sifra_partnera':
      {
        if (this.p.sifra_partnera != null && this.p.sifra_partnera.length > 0)
        {
          this.sifraGreska = "";
          return true;
        }
        
        this.sifraGreska = this.translate.instant('_55');
        return false;
      }
      case 'naziv':
      {
        if (this.p.naziv != null && this.p.naziv.length > 0)
        {
          this.nazivGreska = "";
          return true;
        }
        
        this.nazivGreska = this.translate.instant('_55');
        return false;
      }
      case 'mesto':
      {
        if (this.p.mesto != null && this.p.mesto.length > 0)
        {
          this.mestoGreska = "";
          return true;
        }
        
        this.mestoGreska = this.translate.instant('_55');
        return false;
      }
      case 'pib':
      {
        if (this.p.pib != null && this.p.pib.length > 0)
        {
          this.pibGreska = "";
          return true;
        }
        
        this.pibGreska = this.translate.instant('_55');
        return false;
      }
      default:
        break;
    }
  }

  //--------------------------------------


  SacuvajIzmene()
  {
    let p1: boolean = this.ProveraGreske('sifra_partnera');
    let p2: boolean = this.ProveraGreske('naziv');
    let p3: boolean = this.ProveraGreske('mesto');
    let p4: boolean = this.ProveraGreske('pib');

    if (p1 && p2 && p3 && p4)
    {
      let tekst = this.translate.instant('_94');
      this.dijalogRef = this.dialog.open(DijalogComponent, { data: { tekst } });

      this.dijalogRef.afterClosed().subscribe((res) => 
      {
        if (res == true)
        {
          this.partnerInfo.IzmeniPartnera(this.p);
        }
        else
          this.toastr.info(this.translate.instant('_107'));
      });
    }

  }

  VratiStareVrednosti()
  {
    this.p = Partner.CopyPartner(this.stareVrednosti);

    this.sifraGreska = "";
    this.nazivGreska = "";
    this.mestoGreska = "";
    this.pibGreska = "";
  }


  Nazad()
  {
    this.router.navigate(['/dobavljaci/pregled']);
  }


}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

import { Partner } from '../Klase/Partner';
import { AuthService } from '../Servisi/auth.service';
import { SpinnerService } from '../Servisi/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerInfoService 
{
  constructor
  (
    private authService: AuthService,
    private spinner: SpinnerService,
    private http: Http,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

  DodajPartnera(partner: Partner)
  {
    this.spinner.SetLoaderState(true);
    
    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/partneri/dodaj_partnera", JSON.stringify(partner), {headers: headers}).pipe(map(res=>res.json())).subscribe
    (
      (resp: any) =>
      {
        this.spinner.SetLoaderState(false);
        
        if (partner.id_uloge == 1)  // Kupac
        {
          this.router.navigate(['/kupci/pregled']);
          this.toastr.success(this.translate.instant('_59'));
        }
        else                        // Dobavljac
        {
          this.router.navigate(['/dobavljaci/pregled']);
          this.toastr.success(this.translate.instant('_60'));
        }
      },
      (errorResp: any) =>
      {
        this.spinner.SetLoaderState(false);

        if (partner.id_uloge == 1)  // Kupac
          this.toastr.error(this.translate.instant('_57'));
        else                        // Dobavljac
          this.toastr.error(this.translate.instant('_58'));
      }
    );
  }


  VratiPartnereKorisnika(id_uloge: number)
  {
    let id_korisnika: number = +JSON.parse(localStorage['user']).id_korisnika

    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/partneri/vrati_partnere", {"id_korisnika": id_korisnika, "id_uloge": id_uloge}, {headers: headers}).pipe(map(res=>res.json()));
  }


  IzmeniPartnera(partner: Partner)
  {
    this.spinner.SetLoaderState(true);
    
    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/partneri/izmeni_partnera", JSON.stringify(partner), {headers: headers}).pipe(map(res=>res.json())).subscribe
    (
      (resp: any) =>
      {
        this.spinner.SetLoaderState(false);
        
        if (partner.id_uloge == 1)  // Kupac
        {
          this.router.navigate(['/kupci/pregled']);
          this.toastr.success(this.translate.instant('_96'));
        }
        else                        // Dobavljac
        {
          this.router.navigate(['/dobavljaci/pregled']);
          this.toastr.success(this.translate.instant('_97'));
        }
      },
      (errorResp: any) =>
      {
        this.spinner.SetLoaderState(false);

        if (partner.id_uloge == 1)  // Kupac
          this.toastr.error(this.translate.instant('_98'));
        else                        // Dobavljac
          this.toastr.error(this.translate.instant('_99'));
      }
    );
  }


  ObrisiPartnera(id_partnera: number)
  {
    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/partneri/obrisi_partnera", {"id_partnera": id_partnera}, {headers: headers}).pipe(map(res=>res.json()));
  }


  VratiPartnereKorisnikaMinimalno(id_uloge: number)
  {
    let id_korisnika: number = +JSON.parse(localStorage['user']).id_korisnika

    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/partneri/vrati_partnere_minimalno", {"id_korisnika": id_korisnika, "id_uloge": id_uloge}, {headers: headers}).pipe(map(res=>res.json()));
  }
  
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

import { Kpr } from '../Klase/Kpr';
import { AuthService } from '../Servisi/auth.service';
import { SpinnerService } from '../Servisi/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class KprInfoService 
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



  DodajRacun(kpr: Kpr)
  {
    this.spinner.SetLoaderState(true);
    
    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/kpr/dodaj_racun", JSON.stringify(kpr), {headers: headers}).pipe(map(res=>res.json())).subscribe
    (
      (resp: any) =>
      {
        this.spinner.SetLoaderState(false);
        
        this.router.navigate(['/kpr/pregled']);
        this.toastr.success(this.translate.instant('_146'));
      },
      (errorResp: any) =>
      {
        this.spinner.SetLoaderState(false);
        this.toastr.error(this.translate.instant('_147'));
      }
    );
  }


  VratiPrimljeneRacuneKorisnika()
  {
    let id_korisnika: number = +JSON.parse(localStorage['user']).id_korisnika

    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/kpr/vrati_racune", {"id_korisnika": id_korisnika}, {headers: headers}).pipe(map(res=>res.json()));
  }


  IzmeniRacun(kpr: Kpr)
  {
    this.spinner.SetLoaderState(true);
    
    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/kpr/izmeni_racun", JSON.stringify(kpr), {headers: headers}).pipe(map(res=>res.json())).subscribe
    (
      (resp: any) =>
      {
        this.spinner.SetLoaderState(false);
        
        this.router.navigate(['/kpr/pregled']);
        this.toastr.success(this.translate.instant('_181'));
      },
      (errorResp: any) =>
      {
        this.spinner.SetLoaderState(false);
        this.toastr.error(this.translate.instant('_182'));
      }
    );
  }
  

  ObrisiRacun(id_kpr: number)
  {
    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/kpr/obrisi_racun", {"id_kpr": id_kpr}, {headers: headers}).pipe(map(res=>res.json()));
  }

  
}

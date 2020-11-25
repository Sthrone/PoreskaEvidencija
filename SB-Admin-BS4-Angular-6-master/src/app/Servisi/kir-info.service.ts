import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

import { Kir } from '../Klase/Kir';
import { AuthService } from '../Servisi/auth.service';
import { SpinnerService } from '../Servisi/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class KirInfoService 
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


  DodajRacun(kir: Kir)
  {
    this.spinner.SetLoaderState(true);
    
    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/kir/dodaj_racun", JSON.stringify(kir), {headers: headers}).pipe(map(res=>res.json())).subscribe
    (
      (resp: any) =>
      {
        this.spinner.SetLoaderState(false);
        
        this.router.navigate(['/kir/pregled']);
        this.toastr.success(this.translate.instant('_146'));
      },
      (errorResp: any) =>
      {
        this.spinner.SetLoaderState(false);
        this.toastr.error(this.translate.instant('_147'));
      }
    );
  }


  VratiIzdateRacuneKorisnika()
  {
    let id_korisnika: number = +JSON.parse(localStorage['user']).id_korisnika

    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/kir/vrati_racune", {"id_korisnika": id_korisnika}, {headers: headers}).pipe(map(res=>res.json()));
  }


  IzmeniRacun(kir: Kir)
  {
    this.spinner.SetLoaderState(true);
    
    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/kir/izmeni_racun", JSON.stringify(kir), {headers: headers}).pipe(map(res=>res.json())).subscribe
    (
      (resp: any) =>
      {
        this.spinner.SetLoaderState(false);
        
        this.router.navigate(['/kir/pregled']);
        this.toastr.success(this.translate.instant('_181'));
      },
      (errorResp: any) =>
      {
        this.spinner.SetLoaderState(false);
        this.toastr.error(this.translate.instant('_182'));
      }
    );
  }
  

  ObrisiRacun(id_kir: number)
  {
    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/kir/obrisi_racun", {"id_kir": id_kir}, {headers: headers}).pipe(map(res=>res.json()));
  }


}

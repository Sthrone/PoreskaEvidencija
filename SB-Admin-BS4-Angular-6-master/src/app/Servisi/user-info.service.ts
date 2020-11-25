import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

import { Korisnik } from '../Klase/korisnik'
import { AuthService } from '../Servisi/auth.service';
import { SpinnerService } from '../Servisi/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService 
{
  constructor
  (
    private authService: AuthService,
    private spinner: SpinnerService,
    private http: Http,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private translate: TranslateService
  ) 
  { }


  RegistrujKorisnika(user: Korisnik)
  {
    this.spinner.SetLoaderState(true);

    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/registracija", JSON.stringify(user), {headers: headers}).pipe(map(res=>res.json())).subscribe
    (
      (resp: any) =>
      {
        this.spinner.SetLoaderState(false);
        this.PrijaviKorisnika(user);
      },
      (errorResp: any) =>
      {
        this.spinner.SetLoaderState(false);
        this.toastr.error(this.translate.instant('_33'));
      }
    );

  }


  PrijaviKorisnika(user: Korisnik)
  {
    var headers = this.authService.BuildHeaders();
    this.http.post(environment.apiUrl + "/prijava", JSON.stringify(user), {headers: headers}).pipe(map(res => res.json())).subscribe
    (
      (resp: any) =>
      {
          this.spinner.SetLoaderState(true);

          // Sesija
          localStorage.setItem('user', JSON.stringify(resp.user));

          // Autorizacija
          this.authService.LoginState(true);
          this.authService.SaveToken(resp.token);
          
          this.spinner.SetLoaderState(false); 

          // Poruka
          this.toastr.success(`${ this.translate.instant('_35') }, ${ resp.user.naziv_firme }`);

          // Redirekcija
          this.router.navigate(['/dashboard']);
      }, 
      (errorResp: any) =>
      {
          this.authService.LoginState(false);
          this.toastr.error(this.translate.instant('_36'));
      }
    );
  }

  
  OdjaviKorisnika()
  {
    if (this.authService.IsAuthenticated())
    {
      this.authService.DestroyToken();
    }

    this.authService.LoginState(false); 

    if (localStorage.getItem('user') != null)
    {
      let username = JSON.parse(localStorage.getItem('user')).naziv_firme;
      localStorage.removeItem('user');
      this.toastr.success(`${ this.translate.instant('_37') }, ${ username }`);
    }
    
    this.router.navigate(['/login']);
  }


  IzbaciKorisnika()
  {
    if (this.authService.IsAuthenticated())
      this.authService.DestroyToken();

    this.authService.LoginState(false); 

    if (localStorage.getItem('user') != null)
      localStorage.removeItem('user');
    
    this.toastr.error(this.translate.instant('_38'));

    this.router.navigate(['/login']);
  }


  PonovnaPrijava(korisnik: Korisnik)
  {                   
    this.authService.LoginState(true);

    if (this.location.path().includes('login') || this.location.path().includes('signup'))
      this.router.navigate(['/dashboard']);
    
    //this.toastr.success(`${ this.translate.instant('_35') }, ${korisnik.naziv_firme}`);
  }

}

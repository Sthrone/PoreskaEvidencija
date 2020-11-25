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
export class PoreskaPrijavaService 
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


  NapraviPrijavu(godina: number, mesec: number)
  {
    let id_korisnika: number = +JSON.parse(localStorage['user']).id_korisnika

    var headers = this.authService.BuildHeaders();
    return this.http.post(environment.apiUrl + "/poreska_prijava/napravi_prijavu", {"godina": godina, "mesec": mesec, "id_korisnika": id_korisnika}, {headers: headers}).pipe(map(res=>res.json()));
  }




}

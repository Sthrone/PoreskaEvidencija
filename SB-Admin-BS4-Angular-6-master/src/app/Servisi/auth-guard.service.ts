import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import 
{ 
  Router, 
  CanActivate, 
  CanActivateChild, 
  ActivatedRouteSnapshot,
  RouterStateSnapshot 
} 
from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild
{
  constructor
  (
    private userInfo: UserInfoService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) 
  { }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean
  {
    if ((!this.authService.IsAuthenticated()) || (localStorage['user'] == null))
    {
      // Cistim ostatke ako se neko 'igrao' sa local storage-om.
      if (localStorage['user'] != null)
      {
        localStorage.removeItem('user');
        this.authService.LoginState(false);
      }

      if (this.authService.IsAuthenticated())
      {
        this.authService.DestroyToken();
        this.authService.LoginState(false);
      }

      this.router.navigate(['/login']);

      let tekst = "Access denied. You must log in first!";
      if (localStorage['lang'] != null && localStorage['lang'] == 'srb')
        tekst = "Pristup odbijen. Prvo se morate ulogovati!";

      this.toastr.error(tekst);

      return false;
    } 
    
    // Korisnik je ulogovan ili se predstavio kao takav.
    // Provera identiteta.
    return this.authService.Check(localStorage['user']).pipe(map((x) => 
    {
      // Identitet je ispravan.
      if (x.success == true)  
      {
        return true;
      }
      // Identitet nije ispravan.
      else
      {
        this.userInfo.IzbaciKorisnika();

        this.router.navigate(['/login']);

        let tekst = "Access denied!";
        if (localStorage['lang'] != null && localStorage['lang'] == 'srb')
          tekst = "Pristup odbijen!";

        this.toastr.error(tekst);

        return false;
      }
    }));
  }


  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean 
  {
    return this.canActivate(route, state);
  }

}

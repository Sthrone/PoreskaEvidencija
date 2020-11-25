import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Korisnik } from './Klase/korisnik';
import { UserInfoService } from './Servisi/user-info.service';
import { SpinnerService } from './Servisi/spinner.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit 
{
    public loading;

    constructor
    (
        private userInfo: UserInfoService,
        private spinner: SpinnerService,
        private router: Router,
        private titleService: Title
    ) 
    { 
        this.loading = false;
        this.spinner.loading$.subscribe((newState) =>
        {
            this.loading = newState;
        });
    }

    ngOnInit() 
    {
        // --- --- --- Ponovna prijava --- --- --- 
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('jwtToken');
        if ((user != null) && (token != null))     // Vec je bio ulogovan.
        {
            let ulogovaniKorisnik: Korisnik = Korisnik.FromJSON(JSON.parse(user));
            this.userInfo.PonovnaPrijava(ulogovaniKorisnik);
        }

        // --- --- --- Na vrh --- --- --- 
        this.router.events.subscribe((evt) => 
        {
            if (!(evt instanceof NavigationEnd)) 
            {
                return;
            }
            
            window.scrollTo(0, 0)
        });

        // --- --- --- Naslov --- --- --- 
        let language = localStorage.getItem('lang');
        let naslov = 'Poreska evidencija';
        if ((language != null) && (language == 'en'))
        {
            naslov = 'Tax records';
        }
        this.titleService.setTitle(naslov);
    }

}

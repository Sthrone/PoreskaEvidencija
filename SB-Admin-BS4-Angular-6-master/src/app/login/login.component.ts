import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { Korisnik } from '../Klase/korisnik';
import { UserInfoService } from '../Servisi/user-info.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit 
{
    k: Korisnik;

    //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

    constructor
    (
        private userInfo: UserInfoService,
        private translate: TranslateService, 
        public router: Router,
        private toastr: ToastrService
    ) 
    {
        this.translate.addLangs(['en', 'srb']);
        this.translate.setDefaultLang('srb');

        if (localStorage.getItem('lang') != null)
        {
            this.translate.use(localStorage.getItem('lang'));
        }
        else
        {
            let newLang = 'srb';            
            localStorage.setItem('lang', newLang);
            this.translate.use(newLang);
        }

        this.k = new Korisnik();
        this.k.naziv_firme = "";
        this.k.email = "";
        this.k.lozinka = "";
    }

    ngOnInit() {}


    ProveraEmaila()
    {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var odgovorRe = re.test(String(this.k.email).toLowerCase());
        if(odgovorRe == true)
            return true;
        
        this.toastr.error(this.translate.instant('_29'));
        return false;
    }


    ProveraSifre()
    {
        if ((this.k != null) && (this.k.lozinka != null) && (this.k.lozinka.length > 0))
            return true;

        this.toastr.error(this.translate.instant('_30'));
        return false;
    }


    IzvrsiPrijavu()
    {
        let p1: boolean = this.ProveraEmaila();
        let p2: boolean = this.ProveraSifre();

        if (p1 && p2)
        {
            this.userInfo.PrijaviKorisnika(this.k);
        }
    }

}

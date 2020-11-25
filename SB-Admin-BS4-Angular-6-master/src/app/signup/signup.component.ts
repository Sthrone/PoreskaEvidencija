import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { Korisnik } from '../Klase/korisnik';
import { UserInfoService } from '../Servisi/user-info.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit 
{
    k: Korisnik;
    ponovljenaLozinka: string;

    //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

    constructor
    (
        private userInfo: UserInfoService,
        private translate: TranslateService, 
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
        this.ponovljenaLozinka = "";
    }


    ngOnInit() 
    {

    }


    ProveraNazivaFirme()
    {
        if ((this.k != null) && (this.k.naziv_firme != null) && (this.k.naziv_firme.length > 0))
            return true;

        this.toastr.error(this.translate.instant('_28'));
        return false;
    }


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


    ProveraPonovljeneSifre()
    {
        if ((this.k != null) && (this.k.lozinka != null) && (this.k.lozinka.length > 0))
        {
            if ((this.ponovljenaLozinka != null) && (this.ponovljenaLozinka.length > 0))
            {
                // Provera da li su jednake.
                if (this.k.lozinka == this.ponovljenaLozinka)
                    return true;

                this.toastr.error(this.translate.instant('_32'));
                return false;
            }
            
            this.toastr.error(this.translate.instant('_31'));
            return false;
        }

        this.toastr.error(this.translate.instant('_30'));
        return false;
    }


    IzvrsiRegistraciju()
    {
        let p1: boolean = this.ProveraNazivaFirme();
        let p2: boolean = this.ProveraEmaila();
        let p3: boolean = this.ProveraSifre();

        if (p1 && p2 && p3 && this.ProveraPonovljeneSifre())
        {
            this.userInfo.RegistrujKorisnika(this.k);
        }
    }

}

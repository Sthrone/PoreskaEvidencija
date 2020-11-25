import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

import { UserInfoService } from '../../../Servisi/user-info.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit 
{
    nazivFirme: string;
    pushRightClass: string = 'push-right';

    constructor
    (
        private userInfo: UserInfoService,
        private translate: TranslateService, 
        public router: Router,
        private titleService: Title
    ) 
    {
        //this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.addLangs(['en', 'srb']);
        this.translate.setDefaultLang('srb');

        if (localStorage.getItem('lang') != null)
        {
            this.translate.use(localStorage.getItem('lang'));
        }
        else
        {
            //const browserLang = this.translate.getBrowserLang();
            //let newLang = browserLang.match(/en|srb/) ? browserLang : 'srb';
            
            let newLang = 'srb';            
            localStorage.setItem('lang', newLang);
            this.translate.use(newLang);
        }


        this.router.events.subscribe(val => 
        {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.nazivFirme = "Company.com";
    }

    ngOnInit() 
    {
        this.nazivFirme = JSON.parse(localStorage['user']).naziv_firme.substring(0,16);
    }

    OdjaviKorisnika()
    {
        this.userInfo.OdjaviKorisnika();
    }

    
    //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) 
    {
        localStorage.setItem('lang', language);
        this.translate.use(language);

        this.titleService.setTitle(this.translate.instant('_1'));
    }
    
}

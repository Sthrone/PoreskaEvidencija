import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
//import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent 
{
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    kupciMeni: string = '';
    dobavljaciMeni: string = '';
    kprMeni: string = '';
    kirMeni: string = '';


    @Output() collapsedEvent = new EventEmitter<boolean>();
    
    constructor(/*private translate: TranslateService, */public router: Router) 
    {
        /*
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
        */

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
    }

    eventCalled() 
    {
        this.isActive = !this.isActive;
    }


    addExpandClass(meni: any, element: any) 
    {
        switch (meni)
        {
            case 'kupci':
            {
                if (element === this.kupciMeni) {
                    this.kupciMeni = '0';
                } else {
                    this.kupciMeni = element;
                }
                break;
            }
            case 'dobavljaci':
            {
                if (element === this.dobavljaciMeni) {
                    this.dobavljaciMeni = '0';
                } else {
                    this.dobavljaciMeni = element;
                }
                break;
            }
            case 'kpr':
            {
                if (element === this.kprMeni) {
                    this.kprMeni = '0';
                } else {
                    this.kprMeni = element;
                }
                break;
            }
            case 'kir':
            {
                if (element === this.kirMeni) {
                    this.kirMeni = '0';
                } else {
                    this.kirMeni = element;
                }
                break;
            }
            default:
            {
                if (element === this.showMenu) {
                    this.showMenu = '0';
                } else {
                    this.showMenu = element;
                }
            }
        }
    }


    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

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

    /*
    changeLang(language: string) {
        this.translate.use(language);
    }
    */

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}

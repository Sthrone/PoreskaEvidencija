//------------------ MODULI ------------------
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { LoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//------------------ SERVISI ------------------
import { AuthGuard } from './shared';
import { UserInfoService } from './Servisi/user-info.service';
import { AuthService } from './Servisi/auth.service';
import { PartnerInfoService } from './Servisi/partner-info.service';
import { SpinnerService } from './Servisi/spinner.service';
import { KprInfoService } from './Servisi/kpr-info.service';
import { KirInfoService } from './Servisi/kir-info.service';
import { Poreska_prijava } from './Klase/Poreska_prijava';




// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: 
    [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot
        ({
            loader: 
            {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot
        ({
            timeOut: 7000,
            preventDuplicates: true,
            closeButton: false,
            enableHtml: true
        }),
        LoadingModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: 
    [
        UserInfoService,
        AuthService,
        AuthGuard,
        PartnerInfoService,
        KprInfoService,
        KirInfoService,
        Poreska_prijava,
        SpinnerService,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from './../shared';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DodajKupcaComponent } from './Komponente/dodaj-kupca/dodaj-kupca.component';
import { PregledKupacaComponent } from './Komponente/pregled-kupaca/pregled-kupaca.component';
import { DodajDobavljacaComponent } from './Komponente/dodaj-dobavljaca/dodaj-dobavljaca.component';
import { PregledDobavljacaComponent } from './Komponente/pregled-dobavljaca/pregled-dobavljaca.component';
import { KprUnosComponent } from './Komponente/kpr-unos/kpr-unos.component';
import { KprPregledComponent } from './Komponente/kpr-pregled/kpr-pregled.component';
import { KirUnosComponent } from './Komponente/kir-unos/kir-unos.component';
import { KirPregledComponent } from './Komponente/kir-pregled/kir-pregled.component';
import { DijalogComponent } from './Komponente/dijalog/dijalog.component';
import { PretragaPartneraComponent } from './Komponente/pretraga-partnera/pretraga-partnera.component';
import { KolonePartneraComponent } from './Komponente/kolone-partnera/kolone-partnera.component';
import { IzmeniKupcaComponent } from './Komponente/izmeni-kupca/izmeni-kupca.component';
import { IzmeniDobavljacaComponent } from './Komponente/izmeni-dobavljaca/izmeni-dobavljaca.component';
import { KoloneKprComponent } from './Komponente/kolone-kpr/kolone-kpr.component';
import { KoloneKirComponent } from './Komponente/kolone-kir/kolone-kir.component';
import { PretragaRacunaComponent } from './Komponente/pretraga-racuna/pretraga-racuna.component';
import { IzmeniKprComponent } from './Komponente/izmeni-kpr/izmeni-kpr.component';
import { PretragaFakturaComponent } from './Komponente/pretraga-faktura/pretraga-faktura.component';
import { IzmeniKirComponent } from './Komponente/izmeni-kir/izmeni-kir.component';
import { PppdvComponent } from './Komponente/pppdv/pppdv.component';
import { PopdvComponent } from './Komponente/popdv/popdv.component';


@NgModule({
    imports: 
    [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        PageHeaderModule,
        FormsModule,
        MatDialogModule,
        NgxPaginationModule,
        NgSelectModule,
        MatTooltipModule
    ],
    declarations: 
    [
        LayoutComponent, 
        SidebarComponent, 
        HeaderComponent, 
        DodajKupcaComponent, 
        PregledKupacaComponent, 
        DodajDobavljacaComponent,
        PregledDobavljacaComponent, 
        KprUnosComponent, 
        KprPregledComponent, 
        KirUnosComponent, 
        KirPregledComponent,
        DijalogComponent,
        PretragaPartneraComponent,
        KolonePartneraComponent,
        IzmeniKupcaComponent,
        IzmeniDobavljacaComponent,
        KoloneKprComponent,
        KoloneKirComponent,
        PretragaRacunaComponent,
        IzmeniKprComponent,
        PretragaFakturaComponent,
        IzmeniKirComponent,
        PppdvComponent,
        PopdvComponent
    ],
    entryComponents:
    [
        DijalogComponent
    ]
})
export class LayoutModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { PregledKupacaComponent } from './Komponente/pregled-kupaca/pregled-kupaca.component';
import { DodajKupcaComponent } from './Komponente/dodaj-kupca/dodaj-kupca.component';
import { PregledDobavljacaComponent } from './Komponente/pregled-dobavljaca/pregled-dobavljaca.component';
import { DodajDobavljacaComponent } from './Komponente/dodaj-dobavljaca/dodaj-dobavljaca.component';
import { KprPregledComponent } from './Komponente/kpr-pregled/kpr-pregled.component';
import { KprUnosComponent } from './Komponente/kpr-unos/kpr-unos.component';
import { KirPregledComponent } from './Komponente/kir-pregled/kir-pregled.component';
import { KirUnosComponent } from './Komponente/kir-unos/kir-unos.component';
import { IzmeniKupcaComponent } from './Komponente/izmeni-kupca/izmeni-kupca.component';
import { IzmeniDobavljacaComponent } from './Komponente/izmeni-dobavljaca/izmeni-dobavljaca.component';
import { IzmeniKprComponent } from './Komponente/izmeni-kpr/izmeni-kpr.component';
import { IzmeniKirComponent } from './Komponente/izmeni-kir/izmeni-kir.component';
import { PppdvComponent } from './Komponente/pppdv/pppdv.component';
import { PopdvComponent } from './Komponente/popdv/popdv.component';

const routes: Routes = 
[
    {
        path: '',
        component: LayoutComponent,
        children: 
        [
            {
                path:'',
                redirectTo:'dashboard'
            },
            {
                path:'kupci',
                children:
                [
                    { path:'', redirectTo:'pregled', pathMatch:'full' },
                    { path:'pregled', component:PregledKupacaComponent },
                    { path:'unos', component:DodajKupcaComponent },
                    { path:'izmena', component:IzmeniKupcaComponent }
                ]
            },
            {
                path:'dobavljaci',
                children:
                [
                    { path:'', redirectTo:'pregled', pathMatch:'full' },
                    { path:'pregled', component:PregledDobavljacaComponent },
                    { path:'unos', component:DodajDobavljacaComponent },
                    { path:'izmena', component:IzmeniDobavljacaComponent }
                ]
            },
            {
                path:'kpr',
                children:
                [
                    { path:'', redirectTo:'pregled', pathMatch:'full' },
                    { path:'pregled', component:KprPregledComponent },
                    { path:'unos', component:KprUnosComponent },
                    { path:'izmena', component:IzmeniKprComponent }
                ]
            },
            {
                path:'kir',
                children:
                [
                    { path:'', redirectTo:'pregled', pathMatch:'full' },
                    { path:'pregled', component:KirPregledComponent },
                    { path:'unos', component:KirUnosComponent },
                    { path:'izmena', component:IzmeniKirComponent }
                ]
            },
            {
                path:'pppdv',
                component:PppdvComponent
            },
            {
                path:'popdv',
                component:PopdvComponent
            },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

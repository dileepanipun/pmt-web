import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {HeaderComponent} from "../../navigation/header/header.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    declarations: [
        DashboardLayoutComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FontAwesomeModule,
    ]
})
export class DashboardModule {
}

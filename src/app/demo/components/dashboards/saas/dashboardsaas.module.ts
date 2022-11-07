import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSaasRoutingModule } from './dashboardsaas-routing.module';
import { TagModule } from 'primeng/tag';
import { DashboardSaasComponent } from './dashboardsass.component';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardSaasRoutingModule,
        TagModule,
        KnobModule,
        ChartModule
    ],
    declarations: [
        DashboardSaasComponent
    ]
})
export class DashboardSaasModule { }

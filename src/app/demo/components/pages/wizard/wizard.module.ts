import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        ButtonModule,
        CardModule,
        WizardComponent,
        WizardRoutingModule
    ],
    declarations: [WizardComponent]
})
export class WizardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        WizardRoutingModule,
        DropdownModule,
        CalendarModule,
        RadioButtonModule,
        InputTextModule,
        RippleModule
    ],
    declarations: [WizardComponent]
})
export class WizardModule { }

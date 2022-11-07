import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Landing2RoutingModule } from './landing2-routing.module';
import { Landing2Component } from './landing2.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
    imports: [
        CommonModule,
        Landing2RoutingModule,
        ButtonModule,
        RouterModule,
        StyleClassModule,
        // AppConfigModule,
    ],
    declarations: [Landing2Component]
})
export class Landing2Module { }

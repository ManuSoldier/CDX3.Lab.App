import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Landing2Component } from './landing2.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Landing2Component }
    ])],
    exports: [RouterModule]
})
export class Landing2RoutingModule { }

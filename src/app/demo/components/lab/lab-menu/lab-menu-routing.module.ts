import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LabMenuComponent } from "./lab-menu.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LabMenuComponent }
    ])],
    exports: [RouterModule]
})
export class LabMenuRotingModule{}
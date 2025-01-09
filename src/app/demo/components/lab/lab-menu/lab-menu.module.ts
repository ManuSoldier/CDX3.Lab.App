import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CookieService } from 'ngx-cookie-service';
import { LabService } from "../../../service/LabService";



@NgModule({
    imports: [
        CommonModule,
        ButtonModule,      
    ],
    declarations: [],
    providers: [LabService, CookieService]
}
)
export class LabMenuModule{}
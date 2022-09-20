import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "src/app/app.breadcrumb.service";

@Component({
    templateUrl: "./dashboardsaas.component.html",
})
export class DashboardSaasComponent implements OnInit {
    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([{ label: "Dashboard HR" }]);
    }

    ngOnInit(): void {}
}

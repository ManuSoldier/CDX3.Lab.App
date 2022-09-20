import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "src/app/app.breadcrumb.service";

interface DailyTask {
    id: number;
    checked: boolean;
    label: string;
    images: string[];
}

@Component({
    templateUrl: "./dashboardsaas.component.html",
})
export class DashboardSaasComponent implements OnInit {
    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([{ label: "Dashboard HR" }]);
    }

    ngOnInit(): void {}

    completeTask: number = 1;

    dailyTasks: DailyTask[] = [
        {
            id: 1,
            checked: true,
            label: "Prepare personas",
            images: ["sd", "asdas"],
        },
        {
            id: 2,
            checked: false,
            label: "Prepare a user journey map",
            images: ["sd", "asdas"],
        },
        {
            id: 3,
            checked: false,
            label: "Prepare wireframes for onboarding screen",
            images: ["sd", "asdas"],
        },
        {
            id: 4,
            checked: false,
            label: "Review benchmarks",
            images: ["sd", "asdas"],
        },
        {
            id: 3,
            checked: false,
            label: "Let a plan with UI Team",
            images: ["sd", "asdas"],
        },
    ];
}

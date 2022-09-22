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
    styles: [
        `
            :host ::ng-deep .p-progressbar-value {
                background: #fff;
            }
        `,
    ],
})
export class DashboardSaasComponent implements OnInit {
    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([{ label: "Dashboard HR" }]);
    }

    ngOnInit(): void {}

    progressValue: number = 25;

    completeTask: number = 1;

    projectList = [
        {
            id: 1,
            title: "Ultima Sales",
            totalTasks: 50,
            completedTask: 25,
        },
        {
            id: 2,
            title: "Ultima Landing",
            totalTasks: 50,
            completedTask: 25,
        },
        {
            id: 3,
            title: "Ultima SaaS",
            totalTasks: 50,
            completedTask: 25,
        },
        {
            id: 4,
            title: "Ultima SaaS",
            totalTasks: 50,
            completedTask: 25,
        },
        {
            id: 5,
            title: "Ultima SaaS",
            totalTasks: 50,
            completedTask: 25,
        },
    ];

    teamMembers:any= [
        {
            title: "UX Researchers",
            avatarts: ["asdas", "asdsd", "asdsad"],
        },
        {
            title: "UX Designers",
            avatarts: ["asdas", "asdsd", "asdsad"],
        },
        {
            title: "UI Designers",
            avatarts: ["asdas", "asdsd", "asdsad"],
        },
        {
            title: "Front-End Developers",
            avatarts: ["asdas", "asdsd", "asdsad"],
        },
        {
            title: "Back-End Developers",
            avatarts: ["asdas", "asdsd", "asdsad"],
        }
    ];

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

    basicData: any = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Previous Month",
                data: [22, 36, 11, 33, 2],
                fill: false,
                borderColor: "#E0E0E0",
                tension: 0.5,
            },
            {
                label: "Current Month",
                data: [22, 16, 31, 11, 38],
                fill: false,
                borderColor: "#6366F1",
                tension: 0.5,
            },
        ],
    };
    basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "#495057",
                    boxWidth: 12,
                    boxHeight: 4,
                },
                position: "bottom",
            },
        },
        elements: { point: { radius: 0 } },
        scales: {
            x: {
                ticks: {
                    color: "#495057",
                },
                grid: {
                    color: "#ebedef",
                },
            },
            y: {
                ticks: {
                    color: "#495057",
                    stepSize: 10,
                },
                grid: {
                    color: "#ebedef",
                },
            },
        },
    };
}

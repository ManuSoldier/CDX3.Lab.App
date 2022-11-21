import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

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
            :host ::ng-deep .p-progressbar {
                height: 6px;
            }
            :host ::ng-deep .p-progressbar-value {
                background: #fff;
            }
        `,
    ],
})
export class DashboardSaasComponent implements OnInit {
    private root!: am5.Root;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private zone: NgZone,
    ) {
    }

    ngOnInit(): void { }

    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ngAfterViewInit() {
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');

        this.browserOnly(() => {
            let root = am5.Root.new("chartdiv");

            root.setThemes([am5themes_Animated.new(root)]);

            root.dateFormatter.setAll({
                dateFormat: "yyyy-MM-dd",
                dateFields: ["valueX", "openValueX"],
            });

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    layout: root.verticalLayout,
                })
            );

            let data = [
                {
                    category: "Module #1",
                    start: new Date(2016, 1, 4).getTime(),
                    end: new Date(2016, 4, 14).getTime(),
                    columnSettings: {
                        fill: am5.color(primaryColor),
                        shadowColor: am5.color(0x000000),
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 5,
                        shadowOpacity: 0.3,
                    },
                    task: "UX Researchers",
                },
                {
                    category: "Module #2",
                    start: new Date(2016, 0, 8).getTime(),
                    end: new Date(2016, 3, 10).getTime(),
                    columnSettings: {
                        fill: am5.color(primaryColor),
                        shadowColor: am5.color(0x000000),
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 5,
                        shadowOpacity: 0.3,
                    },
                    task: "UX Designers",
                },
                {
                    category: "Module #3",
                    start: new Date(2016, 2, 23).getTime(),
                    end: new Date(2016, 7, 8).getTime(),
                    columnSettings: {
                        fill: am5.color(primaryColor),
                        shadowColor: am5.color(0x000000),
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 5,
                        shadowOpacity: 0.3,
                    },
                    task: "UI Designers",
                },
                {
                    category: "Module #4",
                    start: new Date(2016, 3, 27).getTime(),
                    end: new Date(2016, 9, 15).getTime(),
                    columnSettings: {
                        fill: am5.color(primaryColor),
                        shadowColor: am5.color(0x000000),
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 5,
                        shadowOpacity: 0.3,
                    },
                    task: "Front-End Devolopers",
                },
                {
                    category: "Module #5",
                    start: new Date(2016, 2, 8).getTime(),
                    end: new Date(2016, 8, 30).getTime(),
                    columnSettings: {
                        fill: am5.color(primaryColor),
                        shadowColor: am5.color(0x000000),
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 5,
                        shadowOpacity: 0.3,
                    },
                    task: "Back-End Devolopers",
                },
            ];

            let yAxis = chart.yAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "category",
                    renderer: am5xy.AxisRendererY.new(root, {}),
                    tooltip: am5.Tooltip.new(root, {}),
                })
            );

            yAxis.data.setAll([
                { category: "Module #1" },
                { category: "Module #2" },
                { category: "Module #3" },
                { category: "Module #4" },
                { category: "Module #5" },
            ]);

            let xAxis = chart.xAxes.push(
                am5xy.DateAxis.new(root, {
                    baseInterval: { timeUnit: "minute", count: 1 },
                    renderer: am5xy.AxisRendererX.new(root, {}),
                })
            );

            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    openValueXField: "start",
                    valueXField: "end",
                    categoryYField: "category",
                    sequencedInterpolation: true,
                })
            );

            series.columns.template.setAll({
                templateField: "columnSettings",
                strokeOpacity: 0,
                tooltipText:
                    "{task}:\n[bold]{openValueX}[/] - [bold]{valueX}[/]",
                cornerRadiusTL: 4,
                cornerRadiusTR: 4,
                cornerRadiusBL: 4,
                cornerRadiusBR: 4,
            });

            series.data.setAll(data);

            series.appear();
            chart.appear(1000, 100);
        });
    }

    ngOnDestroy() {
        this.browserOnly(() => {
            if (this.root) {
                this.root.dispose();
            }
        });
    }

    progressValue: number = 25;

    completeTask: number = 1;

    selectedProjectID: number = 1;

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

    teamMembers: any = [
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
        },
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

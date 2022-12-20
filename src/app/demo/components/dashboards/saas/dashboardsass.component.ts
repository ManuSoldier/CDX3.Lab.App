import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Subscription } from "rxjs";
import { LayoutService } from "src/app/layout/service/app.layout.service";

interface DailyTask {
    id: number;
    checked: boolean;
    label: string;
    avatar: string;
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
export class DashboardSaasComponent implements OnInit, OnDestroy {
    private root!: am5.Root;

    subscription!: Subscription

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.chartInit()
            this.ganttChartInit()
        })
    }

    ordersOptions: any;

    basicData: any;

    basicOptions: any;

    currentTeamsTab: string = 'team'

    ngOnInit(): void {
        this.chartInit()
        this.ganttChartInit()
    }

    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ganttChartInit() {
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color');

        this.browserOnly(() => {
            am5.array.each(am5.registry.rootElements, function(root) {
                if (root.dom.id == 'ganttChartContainer') {
                  root.dispose();
                }
              });
            
            let root = am5.Root.new("ganttChartContainer");

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
                    end: new Date(2016, 5, 8).getTime(),
                    columnSettings: {
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
                    end: new Date(2016, 6, 15).getTime(),
                    columnSettings: {
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
                    start: new Date(2016, 5, 8).getTime(),
                    end: new Date(2016, 7, 30).getTime(),
                    columnSettings: {
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

            yAxis.get('renderer').labels.template.setAll({
                fill: am5.color(textColor),
                fontWeight: '500'
            })

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

            xAxis.get("renderer").labels.template.adapters.add("html", function () {
                return "<div class=\"text-center font-bold text-color\">{value.formatDate('d MMM')}</div><div class=\"text-center\">{value.formatDate('EEE')}</div>";
            });

            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    openValueXField: "start",
                    valueXField: "end",
                    categoryYField: "category",
                    sequencedInterpolation: true,
                    fill: am5.color(primaryColor)
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

    chartInit() {
        this.basicData = {
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
        this.basicOptions = this.getBasicOptions();

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
            avatar: 'assets/demo/images/avatar/circle/avatar-f-1.png'
        },
        {
            title: "UX Designers",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-2.png'
        },
        {
            title: "UI Designers",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-3.png'
        },
        {
            title: "Front-End Developers",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-4.png'
        },
        {
            title: "Back-End Developers",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-5.png'
        },
    ];

    dailyTasks: DailyTask[] = [
        {
            id: 1,
            checked: true,
            label: "Prepare personas",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-6.png'
        },
        {
            id: 2,
            checked: false,
            label: "Prepare a user journey map",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-7.png'
        },
        {
            id: 3,
            checked: false,
            label: "Prepare wireframes for onboarding screen",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-8.png'
        },
        {
            id: 4,
            checked: false,
            label: "Review benchmarks",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-9.png'
        },
        {
            id: 3,
            checked: false,
            label: "Let a plan with UI Team",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-10.png'
        },
    ];

    changeChecked() {
        this.completeTask = this.dailyTasks.filter((task) => task.checked).length
    }

    getBasicOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color')
        const surfaceLight = getComputedStyle(document.body).getPropertyValue('--surface-100')
        return {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
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
                        color: textColor,
                    },
                    grid: {
                        color: surfaceLight,
                    },
                },
                y: {
                    ticks: {
                        color: textColor,
                        stepSize: 10,
                    },
                    grid: {
                        color: surfaceLight,
                    },
                },
            },
        }
    }

    ngOnDestroy() {
        this.browserOnly(() => {
            if (this.root) {
                this.root.dispose();
            }
        });
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}

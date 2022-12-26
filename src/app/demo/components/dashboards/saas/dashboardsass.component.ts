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
    description: string;
    avatar: string;
    borderColor: string
}

@Component({
    templateUrl: "./dashboardsaas.component.html",
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

    selectedTeam: string = 'UX Researchers';

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

        this.browserOnly(() => {
            am5.array.each(am5.registry.rootElements, function (root) {
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
                    category: "UX Researchers",
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
                    category: "UX Designers",
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
                    category: "UI Designers",
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
                    category: "Front-End Devolopers",
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
                    category: "Back-End Devolopers",
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
                html: `<div class=\"flex flex-column gap-1 font-medium text-sm\"> <div>{category}</div> <div class=\"text-bluegray-300\">8 tasks for {totalWeek} weeks</div> </div>`,
                centerX: 0,
            })



            yAxis.data.setAll([
                { category: "Back-End Devolopers", totalWeek: 4 },
                { category: "Front-End Devolopers", totalWeek: 6 },
                { category: "UI Designers", totalWeek: 8 },
                { category: "UX Designers", totalWeek: 5 },
                { category: "UX Researchers", totalWeek: 12 },
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

    teams: any = [
        {
            title: "UX Researchers",
            avatar: ['assets/demo/images/avatar/circle/avatar-f-1.png', 'assets/demo/images/avatar/circle/avatar-f-6.png', 'assets/demo/images/avatar/circle/avatar-f-11.png', 'assets/demo/images/avatar/circle/avatar-f-12.png'],
            avatarText: '+4',
            badgeClass: 'bg-pink-500'
        },
        {
            title: "UX Designers",
            avatar: ['assets/demo/images/avatar/circle/avatar-f-2.png'],
            badgeClass: 'bg-blue-500'
        },
        {
            title: "UI Designers",
            avatar: ['assets/demo/images/avatar/circle/avatar-f-3.png', 'assets/demo/images/avatar/circle/avatar-f-8.png'],
            avatarText: '+1',
            badgeClass: 'bg-green-500'
        },
        {
            title: "Front-End Developers",
            avatar: ['assets/demo/images/avatar/circle/avatar-f-4.png', 'assets/demo/images/avatar/circle/avatar-f-9.png'],
            badgeClass: 'bg-yellow-500'
        },
        {
            title: "Back-End Developers",
            avatar: ['assets/demo/images/avatar/circle/avatar-f-10.png'],
            badgeClass: 'bg-purple-500'
        },
    ];

    dailyTasks: DailyTask[] = [
        {
            id: 1,
            checked: true,
            label: "Prepare personas",
            description: "Create profiles of fictional users representing target audience for product or service.",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-6.png',
            borderColor: 'border-pink-500'
        },
        {
            id: 2,
            checked: false,
            label: "Prepare a user journey map",
            description: "Visual representation of steps a user takes to accomplish a goal within product or service.",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-7.png',
            borderColor: 'border-purple-500'

        },
        {
            id: 3,
            checked: false,
            label: "Prepare wireframes for onboarding screen",
            description: "Create low-fidelity mockups of onboarding screen. Include layout, hierarchy, functionality.",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-8.png',
            borderColor: 'border-blue-500'
        },
        {
            id: 4,
            checked: false,
            label: "Review benchmarks",
            description: "Conduct research on similar products or services to understand market standards and identify opportunities.",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-9.png',
            borderColor: 'border-green-500'
        },
        {
            id: 3,
            checked: false,
            label: "Let a plan with UI Team",
            description: "Collaborate with UI design team to create plan for visual design of product or service.",
            avatar: 'assets/demo/images/avatar/circle/avatar-f-10.png',
            borderColor: 'border-yellow-500'

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

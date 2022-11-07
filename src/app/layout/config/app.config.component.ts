import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../app.menu.service';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit {

    @Input() minimal: boolean = false;

    componentThemes: any[] = [];

    menuThemes: any[] = [];

    topbarThemes: any[] = [];

    selectedMenuTheme: string;

    selectedComponentTheme: string;

    selectedTopbarTheme: string;

    scales: number[] = [12,13,14,15,16];

    constructor(public layoutService: LayoutService, public menuService: MenuService) { }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
    }

    get menuMode(): string {
        return this.layoutService.config.menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.menuMode = _val;
        if (_val === 'overlay') {
            this.layoutService.state.menuActive = false;
        }
        else {
            this.layoutService.state.menuActive = true;
        }
        if (this.layoutService.isSlim() || this.layoutService.isHorizontal()) {
            this.menuService.reset();
        }
    }

    get inlineMenuPosition(): string {
        return this.layoutService.config.inlineMenuPosition;
    }

    set inlineMenuPosition(_val: string) {
        this.layoutService.config.inlineMenuPosition = _val;
        if (this.layoutService.isSlim() || this.layoutService.isHorizontal()) {
            this.menuService.reset();
        }
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    set colorScheme(_val: string) {
        this.changeColorScheme(_val);
    }

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.ripple = _val;
    }

    get rtl(): boolean {
        return this.layoutService.config.isRTL;
    }

    set rtl(_val: boolean) {
        this.layoutService.config.isRTL = _val;
    }

    get menuTheme(): string {
        return this.layoutService.config.menuTheme;
    }

    set menuTheme(_val: string) {
        this.layoutService.config.menuTheme = _val;
    }

    ngOnInit() {
        this.componentThemes = [
            {name: 'indigo', color: '#3F51B5'},
            {name: 'pink', color: '#E91E63'},
            {name: 'purple', color: '#9C27B0'},
            {name: 'deeppurple', color: '#673AB7'},
            {name: 'blue', color: '#2196F3'},
            {name: 'lightblue', color: '#03A9F4'},
            {name: 'cyan', color: '#00BCD4'},
            {name: 'teal', color: '#009688'},
            {name: 'green', color: '#4CAF50'},
            {name: 'lightgreen', color: '#8BC34A'},
            {name: 'lime', color: '#CDDC39'},
            {name: 'yellow', color: '#FFEB3B'},
            {name: 'amber', color: '#FFC107'},
            {name: 'orange', color: '#FF9800'},
            {name: 'deeporange', color: '#FF5722'},
            {name: 'brown', color: '#795548'},
            {name: 'bluegrey', color: '#607D8B'}
        ];

        this.menuThemes = [
            {name: 'light', color: '#FDFEFF'},
            {name: 'dark', color: '#434B54'},
            {name: 'indigo', color: '#1A237E'},
            {name: 'bluegrey', color: '#37474F'},
            {name: 'brown', color: '#4E342E'},
            {name: 'cyan', color: '#006064'},
            {name: 'green', color: '#2E7D32'},
            {name: 'deeppurple', color: '#4527A0'},
            {name: 'deeporange', color: '#BF360C'},
            {name: 'pink', color: '#880E4F'},
            {name: 'purple', color: '#6A1B9A'},
            {name: 'teal', color: '#00695C'}
        ];

        this.topbarThemes = [
            {name: 'lightblue', color: '#2E88FF'},
            {name: 'dark', color: '#363636'},
            {name: 'white', color: '#FDFEFF'},
            {name: 'blue', color: '#1565C0'},
            {name: 'deeppurple', color: '#4527A0'},
            {name: 'purple', color: '#6A1B9A'},
            {name: 'pink', color: '#AD1457'},
            {name: 'cyan', color: '#0097A7'},
            {name: 'teal', color: '#00796B'},
            {name: 'green', color: '#43A047'},
            {name: 'lightgreen', color: '#689F38'},
            {name: 'lime', color: '#AFB42B'},
            {name: 'yellow', color: '#FBC02D'},
            {name: 'amber', color: '#FFA000'},
            {name: 'orange', color: '#FB8C00'},
            {name: 'deeporange', color: '#D84315'},
            {name: 'brown', color: '#5D4037'},
            {name: 'grey', color: '#616161'},
            {name: 'bluegrey', color: '#546E7A'},
            {name: 'indigo', color: '#3F51B5'}
        ];

        this.selectedMenuTheme = 'light';

        this.selectedComponentTheme = 'indigo';
    
        this.selectedTopbarTheme = 'blue';
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeColorScheme(colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const themeLinkHref = themeLink.getAttribute('href');
        const currentColorScheme = 'theme-' + this.layoutService.config.colorScheme;
        const newColorScheme = 'theme-' + colorScheme;
        const newHref = themeLinkHref!.replace(currentColorScheme, newColorScheme);
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    changeTheme(theme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.onConfigUpdate();
        });
    }

    changeComponentTheme(theme) {
        this.selectedComponentTheme = theme.name;
    }

    changeTopbarTheme(theme) {
        this.selectedTopbarTheme = theme.name;
    }

    changeMenuTheme(theme) {
        console.log(theme)
        this.selectedMenuTheme = theme.name;
    }

    replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-link';
        const themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
    
}

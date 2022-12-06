import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface InlineMenuActive {
    [key: string]: boolean
}

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    componentTheme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
    menuTheme: string;
    topbarTheme: string;
    inlineMenuPosition: string;
}

interface LayoutState {
    staticMenuMobileActive: boolean;
    overlayMenuActive: boolean;
    staticMenuDesktopInactive: boolean;
    configSidebarVisible: boolean;
    menuHoverActive: boolean;
    rightMenuActive: boolean;
    topbarMenuActive: boolean;
    inlineMenuActive: InlineMenuActive;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {

    config: AppConfig = {
        ripple: true,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        componentTheme: 'indigo',
        scale: 14,
        menuTheme: 'light',
        topbarTheme: 'blue',
        inlineMenuPosition: 'bottom'
    };

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        rightMenuActive: false,
        topbarMenuActive: false,
        inlineMenuActive: {
            top: false,
            bottom: false
        }
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    private topbarMenuOpen = new Subject<any>();
    
    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    topbarMenuOpen$ = this.topbarMenuOpen.asObservable();

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;

            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
        }
        else {
            this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    onTopbarMenuToggle() {
        this.state.topbarMenuActive = !this.state.topbarMenuActive;
        this.topbarMenuOpen.next(null);
    }

    onOverlaySubmenuOpen() {
        this.overlayOpen.next(null);
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isSlim() {
        return this.config.menuMode === 'slim';
    }

    isHorizontal() {
        return this.config.menuMode === 'horizontal';
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this.configUpdate.next(this.config);
    }

    isRightMenuActive(): boolean {
        return this.state.rightMenuActive;
    }

    openRightSidebar(): void {
        this.state.rightMenuActive = true;
    }

    onInlineMenuToggle(key: string) {
        if (key !== this.config.inlineMenuPosition) {
            this.state.inlineMenuActive[this.config.inlineMenuPosition] = false;
        }

        this.state.inlineMenuActive[key] = !this.state.inlineMenuActive[key];
    }
}

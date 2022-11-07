import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface InlineMenuActive {
    top: boolean;
    bottom: boolean;
}

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
    menuTheme: string;
    isRTL: boolean;
    inlineMenuPosition: string;
}

interface LayoutState {
    menuActive: boolean;
    overlayMenuActive: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
    rightMenuActive: boolean;
    mobileTopbarActive: boolean;
    inlineMenuActive: InlineMenuActive;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {

    config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'indigo',
        scale: 14,
        menuTheme: 'colorScheme',
        isRTL: false,
        inlineMenuPosition: 'bottom'
    };

    state: LayoutState = {
        menuActive: true,
        overlayMenuActive: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        rightMenuActive: false,
        mobileTopbarActive: false,
        inlineMenuActive: {
            top: false,
            bottom: false
        }
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;

            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.menuActive = !this.state.menuActive;
        }
        else {
            this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
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

    isRTL() {
        return this.config.isRTL;
    }

    isRightMenuActive(): boolean {
        return this.state.rightMenuActive;
    }

    onInlineMenuToggle(key: string) {
        if (key !== this.config.inlineMenuPosition) {
            this.state.inlineMenuActive[this.config.inlineMenuPosition] = false;
        }

        this.state.inlineMenuActive[key] = !this.state.inlineMenuActive[key];
    }
}

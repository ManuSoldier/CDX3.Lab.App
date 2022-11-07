import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MenuService } from './app.menu.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopbarComponent } from './app.topbar.component';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent implements OnDestroy {

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

    constructor(private menuService: MenuService, public layoutService: LayoutService, public renderer: Renderer2, public router: Router, private cd: ChangeDetectorRef) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                    || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
            });
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.layoutService.isOverlay()) {
            this.layoutService.state.menuActive = false;
        }
        this.menuService.reset();
        if(this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    get containerClass() {
        return {
            'layout-menu-dark': this.layoutService.config.menuTheme === 'dark',
            'layout-topbar-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-rtl': this.layoutService.config.isRTL,
            'layout-menu-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-menu-static': this.layoutService.config.menuMode === 'static',
            'layout-menu-slim': this.layoutService.config.menuMode === 'slim',
            'layout-menu-sidebar': this.layoutService.config.menuMode === 'sidebar',  
            'layout-menu-horizontal': this.layoutService.config.menuMode === 'horizontal',
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple,
            'layout-menu-active': this.layoutService.state.menuActive,
            'layout-menu-mobile-active': this.layoutService.state.staticMenuMobileActive
        }
    }

    onSidebarMouseOver(event: MouseEvent): void {
        if (this.layoutService.config.menuMode === 'sidebar' && this.layoutService.isDesktop()) {
            this.layoutService.state.menuActive = true;
        }
    }

    onSidebarMouseLeave(event: MouseEvent): void {
        if (this.layoutService.config.menuMode === 'sidebar' && this.layoutService.isDesktop() ) {
            this.layoutService.state.menuActive = false;
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

}

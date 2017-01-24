import {Component,AfterViewInit,ElementRef,ViewChild} from '@angular/core';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    
    layoutCompact: boolean = false;

    layoutMode: MenuOrientation = MenuOrientation.STATIC;
    
    darkMenu: boolean = false;
    
    profileMode: string = 'inline';

    rotateMenuButton: boolean;

    topbarItemsActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutContainer: HTMLDivElement;

    modal: HTMLDivElement;

    @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarItemsActive = false;

        if(this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;

            if(this.overlayMenuActive)
                this.enableModal();
            else
                this.disableModal();
        }
        else {
            if(this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            }
            else {
                if(this.staticMenuMobileActive) {
                    this.staticMenuMobileActive = false;
                    this.disableModal();
                }
                else {
                    this.staticMenuMobileActive = true;
                    this.enableModal();
                }
            }
        }

        event.preventDefault();
    }

    enableModal() {
        this.modal = document.createElement("div");
        this.modal.className = 'layout-mask';
        this.layoutContainer.appendChild(this.modal);
    }
    
    disableModal() {
        if(this.modal) {
            this.layoutContainer.removeChild(this.modal);
        }
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    ngOnDestroy() {
        this.disableModal();    
    }

}
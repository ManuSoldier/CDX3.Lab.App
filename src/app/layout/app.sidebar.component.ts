import { Component, ElementRef, OnDestroy } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent implements OnDestroy {

    constructor(public layoutService: LayoutService, public el: ElementRef) {}

    resetOverlay() {
        if(this.layoutService.state.overlayMenuActive) {
            this.layoutService.state.overlayMenuActive = false;
        }
    }

    get menuProfilePosition(): string {
        return this.layoutService.config.menuProfilePosition;
    }

    ngOnDestroy() {
        this.resetOverlay();
    }
}

import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig, LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-rightmenu',
    templateUrl: './app.rightmenu.component.html'
})
export class AppRightMenuComponent implements OnDestroy {

    config!: AppConfig;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {}

    get rightMenuActive(): boolean {
        return this.layoutService.state.rightMenuActive;
    }

    set rightMenuActive(_val: boolean) {
        this.layoutService.state.rightMenuActive = _val;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

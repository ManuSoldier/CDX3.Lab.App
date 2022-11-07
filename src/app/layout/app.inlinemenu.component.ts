import { Component, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-inline-menu',
    templateUrl: './app.inlinemenu.component.html',
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px',
                paddingBottom: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
                overflow: 'visible'
            })),
            state('visible', style({
                opacity: 1,
                'z-index': 100
            })),
            state('hidden', style({
                opacity: 0,
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('visible => hidden', animate('.1s linear')),
            transition('hidden => visible', [style({transform: 'scaleY(0.8)'}), animate('.12s cubic-bezier(0, 0, 0.2, 1)')])
        ])
    ]
})
export class AppInlineMenuComponent {

    @Input() key: string;

    @Input() style: any;

    @Input() styleClass: string;

    active: boolean;

    tabIndex: number = -1;

    isTooltipDisabled: boolean = true;

    constructor(public layoutService: LayoutService) { }

    onClick() {
        this.layoutService.onInlineMenuToggle(this.key);
    }

    isHorizontalActive() {
       return this.layoutService.isHorizontal() && !this.layoutService.isMobile();
    }
}

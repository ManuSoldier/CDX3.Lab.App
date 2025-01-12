import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent {

    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private router: Router,private cookieService: CookieService) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(event => {
            const root = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = [];
            this.addBreadcrumb(root, [], breadcrumbs);

            this._breadcrumbs$.next(breadcrumbs);
        });
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
        const routeUrl = parentUrl.concat(route.url.map(url => url.path));
        const breadcrumb = route.data['breadcrumb'];
        const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumb'] : null;

        if (breadcrumb && breadcrumb !== parentBreadcrumb) {
            breadcrumbs.push({
                label: route.data['breadcrumb'],
                url: '/' + routeUrl.join('/')
            });
        }

        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }

    handleSignOut(): void {
        this.clearLoginInfo();
        window.location.href="https://cdx3-gateway.eastus.azurecontainer.io/" 
      }
    
      clearLoginInfo(): void {
        const allCookies = this.cookieService.getAll();
    
        console.log(allCookies);
        Object.keys(allCookies).forEach(cookieName => {
            this.cookieService.delete(cookieName, '/'); 
        });
        document.cookie = 'KEYCLOAK_IDENTITY=; Path=/realms/compliance365/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'KEYCLOAK_SESSION=; Path=/realms/compliance365/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      }

}

import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root', // This ensures the service is globally available
})
export class LabService {
  private apiMenuUrl = ' https://cdx3-gateway.eastus.azurecontainer.io/api/get_lab_menu';

  constructor(private cookieService: CookieService) {}

  getMenu(payload?: any): Observable<any> {
    const defaultPayload = { tenant_id: 10, system_id: 10 };
    const finalPayload = payload || defaultPayload;
    const token = this.cookieService.get('Access_token');

    return from(
      axios
        .post(this.apiMenuUrl, finalPayload, {
          headers:{
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${this.cookieService.get('token')
          } `
        }
      })
      
        .then((response) => response.data.ml_lab || [])
        .catch((error) => {
          console.error('API Error:', error);
          throw error;
        })
    );
  }
}

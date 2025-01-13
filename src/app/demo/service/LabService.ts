import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root', // This ensures the service is globally available
})
export class LabService {
  private apiMenuUrl = environment.API_GATEWAY_URL;

  constructor(private cookieService: CookieService) {}

  getMenu(payload?: any): Observable<any> {
    const defaultPayload = { tenant_id: 10, system_id: 10 };
    const finalPayload = payload || defaultPayload;
    const token = this.cookieService.get('access_token');

    return from(
      axios
        .post(`${this.apiMenuUrl}/api/get_lab_menu`, finalPayload, {
          headers:{
            'Content-Type': 'application/json; charset= utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
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

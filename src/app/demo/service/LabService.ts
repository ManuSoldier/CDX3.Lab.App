import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root', // This ensures the service is globally available
})
export class LabService {
  private apiMenuUrl = 'http://192.168.190.189:8081/api/LAB_DWMS/GetMenu';

  constructor(private cookieService: CookieService) {}

  getMenu(payload?: any): Observable<any> {
    const defaultPayload = { tenant_id: 10, system_id: 10 };
    const finalPayload = payload || defaultPayload;
    const token = this.cookieService.get('id_token');

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

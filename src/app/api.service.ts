import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL: string;

  constructor() {
    if (environment.development) {
      this.baseURL = environment.baseURL;
    } else if (environment.baseURL && environment.baseURL !== '') {
      this.baseURL = environment.baseURL + '/api/';
    } else {
      this.baseURL = location.origin + '/api/';
    }
  }
}

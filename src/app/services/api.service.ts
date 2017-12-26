import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor (private http: HttpClient) { }

  getDevices(): any {
    return this.http.get(`${this.baseUrl}/devices`);
  }

  doDeviceSearch(): any {
    return this.http.get(`${this.baseUrl}/devices/search`);
  }

  getSettings(): any {
    return this.http.get(`${this.baseUrl}/settings`);
  }

  saveSettings(settings: any): any {
    return this.http.post(`${this.baseUrl}/settings`, settings);
  }

  getObjects(deviceId): any {
    return this.http.get(`${this.baseUrl}/devices/${deviceId}/objects`);
  }

  getProperties(deviceId, objectId): any {
    return this.http.get(`${this.baseUrl}/devices/${deviceId}/objects/${objectId}`);
  }
}

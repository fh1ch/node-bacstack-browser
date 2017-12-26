import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  constructor(private api: ApiService) { }

  devices: any;

  ngOnInit() {
    this.devices = this.api.getDevices();
  }

  searchDevices() {
    this.api.doDeviceSearch().subscribe(() => {
      setTimeout(() => {
        this.devices = this.api.getDevices();
      }, 500);
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private api: ApiService) { }

  nics = [
    {name: 'en0 - 192.168.178.3', id: '12'},
    {name: 'lo0 - 127.0.0.1', id: '13'}
  ];

  ports = [
    {name: 'BAC0', value: 47808},
    {name: 'BAC1', value: 47809},
    {name: 'BAC2', value: 47810},
    {name: 'BAC3', value: 47811},
    {name: 'BAC4', value: 47812},
    {name: 'BAC5', value: 47813},
    {name: 'BAC6', value: 47814},
    {name: 'BAC7', value: 47815},
    {name: 'BAC8', value: 47816},
    {name: 'BAC9', value: 47817},
    {name: 'BACA', value: 47818},
    {name: 'BACB', value: 47819},
    {name: 'BACC', value: 47820},
    {name: 'BACD', value: 47821},
    {name: 'BACE', value: 47822},
    {name: 'BACF', value: 47823}
  ];

  languages = [
    {name: 'English', value: 'en'}/*,
    {name: 'German', value: 'de'}*/
  ];

  settings = {
    port: 47800,
    nic: 12,
    timeout: 4000,
    language: 'en',
    analytics: true
  };
  statusMessage: any;

  ngOnInit() {
    this.api.getSettings().subscribe(res => {
      this.settings = res;
    });
  }

  saveSettings() {
    this.api.saveSettings(this.settings).subscribe(res => {
      this.statusMessage = {};
      setTimeout(() => {
        this.statusMessage = null;
      }, 3000);
    });
  }
}

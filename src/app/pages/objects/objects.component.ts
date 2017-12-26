import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  device: any;

  iconList = {
    10: 'pficon-blueprint',
    15: 'pficon-messages',
    29: 'pficon-folder-open',
    0: 'pficon-service',
    1: 'pficon-service',
    2: 'pficon-service',
    3: 'pficon-service',
    4: 'pficon-service',
    5: 'pficon-service',
    8: 'pficon-server',
    13: 'pficon-service',
    14: 'pficon-service'
  };

  unitList = {
    29: '%',
    37: 'Lx',
    62: '°C',
    73: 's',
    95: '',
    96: 'PPM'
  };

  objects: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.device = params.deviceId;
      this.objects = this.api.getObjects(this.device);
    });
  }
}

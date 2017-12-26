import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  device: any;
  object: any;

  properties: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.device = params.deviceId;
      this.object = params.objectId;
      this.properties = this.api.getProperties(this.device, this.object);
    });
  }

  propertyResolver(property) {
    if (property.length === 1) {
      if (property[0].type === 12) {
        return `Type: ${property[0].value.type} | Instance: ${property[0].value.instance}`;
      }
      return property[0].value;
    }
    return '';
  }
}

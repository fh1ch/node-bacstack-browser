import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutComponent } from './pages/about/about.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ObjectsComponent } from './pages/objects/objects.component';
import { PropertiesComponent } from './pages/properties/properties.component';

import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BrowseComponent,
    SettingsComponent,
    ObjectsComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { ObjectsComponent } from './pages/objects/objects.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([
    {path: '', redirectTo: '/browse', pathMatch: 'full'},
    {path: 'about', component: AboutComponent},
    {path: 'browse', component: BrowseComponent},
    {path: 'objects/:deviceId', component: ObjectsComponent},
    {path: 'properties/:deviceId/:objectId', component: PropertiesComponent},
    {path: 'settings', component: SettingsComponent}
  ])],
})
export class AppRoutingModule { }

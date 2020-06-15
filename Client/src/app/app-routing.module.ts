import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth-guard.service'
import { HomeComponent } from './home/home.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { MapsearchComponent } from './mapsearch/mapsearch.component';
import { TestComponent } from './test/test.component';
import { ParkingMapComponent } from './parking-map/parking-map.component';
import { RandomMapComponent } from './random-map/random-map.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MapGoComponent } from './map-go/map-go.component';


const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'aboutus', component: AboutusComponent, canActivate: [AuthGuard] },
  { path: 'howitworks', component:  HowitworksComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'mapsearch', component: MapsearchComponent, canActivate: [AuthGuard] },
  { path: 'test', component:TestComponent, canActivate: [AuthGuard] },
  { path: 'parkingMap', component:ParkingMapComponent, canActivate: [AuthGuard] },
  { path: 'randomMap', component:RandomMapComponent, canActivate: [AuthGuard] },
  { path: 'contactus', component:ContactUsComponent, canActivate: [AuthGuard] },
  { path: 'mapgo', component:MapGoComponent, canActivate: [AuthGuard] },
  
  
   { path: '**', redirectTo: '/login', pathMatch: 'full' }
 //  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
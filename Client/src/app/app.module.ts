import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard} from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { MapsearchComponent } from './mapsearch/mapsearch.component';
import { AgmDirectionModule } from 'agm-direction';
import {AgmCoreModule} from '@agm/core'
import {AgmMap, MouseEvent,MapsAPILoader  } from '@agm/core';
import { TestComponent } from './test/test.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { RandomMapComponent } from './random-map/random-map.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AboutusComponent,
    SignupComponent,
    SettingsComponent,
    ReportsComponent,
    DashboardComponent,
    HomeComponent,
    HowitworksComponent,
    MapsearchComponent,
    TestComponent,
    ParentComponent,
    ChildComponent,
    RandomMapComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDm3GGXnDDHM6K9DB8aUERh2HR0qpFXJGY',
      libraries: ["places",'geometry']}),
    AgmDirectionModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

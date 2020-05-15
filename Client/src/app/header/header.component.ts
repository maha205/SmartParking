import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _backendService: BackendService, private _route: Router,private authenticationService: AuthGuard) { }

  ngOnInit() {

  }
 
  logout(){
    window.localStorage.removeItem("token");
    this._route.navigate(['/login']);
  }

}
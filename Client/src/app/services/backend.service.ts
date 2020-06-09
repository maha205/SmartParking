import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private _http: HttpClient) { }

  login(formData){
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  return this._http.post("http://localhost:3000/login", formData, httpOptions);
  }

  updateUser(formData){
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  return this._http.post("http://localhost:3000/updateuser", formData, httpOptions);
  }

  setUser(formData){
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  return this._http.post("http://localhost:3000/signup", formData, httpOptions);
  }

  getUser(){
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  return this._http.get("http://localhost:3000/user",httpOptions);
  }
  setLocations(formData){
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  return this._http.post("http://localhost:3000/setlocation", formData, httpOptions);
  }
  getUserLocation(){
 let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  return this._http.get("http://localhost:3000/getlocation", httpOptions);
}

searchParking(formData){
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  return this._http.post("http://localhost:3000/searchparking", formData, httpOptions);
}

}

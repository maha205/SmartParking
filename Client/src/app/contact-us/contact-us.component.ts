import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  savedChanges: boolean = false;
  docData;

  constructor(private _backendService: BackendService, private _route: Router) { }

  settings(formData){
    this.dataLoading = true;
    this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.savedChanges = true;



  //   this.querySubscription = this._backendService.updateUser(formData).subscribe((res) => {
  //     if (res["errorCode"] > 0) {
  //         this.error = false;
  //         this.errorMessage = "";
  //         this.dataLoading = false;
  //         this.savedChanges = true;
  //     } else {
  //         this.error = true;
  //         this.errorMessage = res["errorMessage"];
  //         this.dataLoading = false;
  //     }
  // },
  //     (error) => {
  //         this.error = true;
  //         this.errorMessage = error.message;
  //         this.dataLoading = false;
  //     },
  //     () => {
  //         this.dataLoading = false;
  //     });
}


  ngOnInit(): void {
  }

}

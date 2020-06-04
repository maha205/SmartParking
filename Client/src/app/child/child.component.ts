import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import{ GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
 // title = GlobalConstants.siteTitle;
 distance = 10 ;

  constructor() { 
    //GlobalConstants.setDistance(5);
    this.distance = GlobalConstants.distance;
   //  GlobalConstants.setTitle("maha") ; 
    // this.title = GlobalConstants.siteTitle;


   // console.log(GlobalConstants.siteTitle);

  }
  ngOnInit(): void {
  }

}

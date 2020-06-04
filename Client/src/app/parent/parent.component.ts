import { Component, OnInit,ViewChild } from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  template: `
  Message: {{message}}
  <app-child (messageEvent)="receiveMessage($event)"></app-child>
    `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  
  constructor() { }

  message:string;

  receiveMessage($event) {
    this.message = $event
  }
  
  ngOnInit(): void {
  }

}

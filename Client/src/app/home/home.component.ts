import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(){

     this.loadScript('assets/js/jquery-3.3.1.min.js');
     this.loadScript('assets/vendors/appear/jquery.appear.min.js');
     this.loadScript('assets/vendors/jquery.easing/jquery.easing.min.js');
     this.loadScript('assets/js/popper.min.js');
     this.loadScript('assets/js/bootstrap.min.js');
     this.loadScript('assets/vendors/common/common.min.js');
     this.loadScript('assets/vendors/fancybox/jquery.fancybox.min.js');
     this.loadScript('assets/vendors/menu/src/main.menu.js');
     this.loadScript('assets/vendors/owl.carousel/owl.carousel.min.js');
     this.loadScript('assets/vendors/animated-headline/js/animated-headline.js');
     this.loadScript('assets/js/main.js');
     this.loadScript('assets/js/theme.init.js');
     this.loadScript('assets/js/custom.js');

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-essentials',
  templateUrl: './essentials.page.html',
  styleUrls: ['./essentials.page.scss'],
})
export class EssentialsPage implements OnInit {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};


  constructor(public router: Router, public theInAppBrowser: InAppBrowser) { }

  ngOnInit() {
  }

  goBill(){
    this.router.navigate(['/bill'])
  }

  goApps(){
    this.router.navigate(['/top-apps'])
  }

  goGallery(){
    this.router.navigate(['/gallery'])
  }

  goWeather(){
    this.router.navigate(['/weather'])
  }

 goTraffic(){
  //window.open('https://www.myt.mu/events/trafficwatch', '_blank');
  let url = 'https://www.myt.mu/events/trafficwatch';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goAvis(){
  let url = 'https://www.myt.mu/sinformer/avisdedeces/';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goInvestMauritius(){
  let url = 'https://www.edbmauritius.org/';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goAirport(){
  let url = 'https://mauritius-airport.atol.aero/';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goMauritiusTelecom(){
  let url = 'https://www.myt.mu/';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goFootball(){
  let url = 'https://www.livescore.com';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goFlights(){
  let url = 'https://mauritius-airport.atol.aero/passengers/flights/flight-arrival-search';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goMauritiusTourism(){
  let url = 'https://mauritiusnow.com/';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goCinema(){
   //window.open('https://www.myt.mu/sinformer/cinema', '_blank')
   let url = 'https://www.cinema.mu';
   let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
 }

 goScanner(){
   this.router.navigate(['/scanner'])
 }

 goLotery(){
  //window.open('https://www.myt.mu/sinformer/loterie/', '_blank')
  let url = 'https://www.myt.mu/sinformer/loterie/';
  let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
 }

 goRadio(){
  this.router.navigate(['/radio'])
 }

 goEmergency(){
  this.router.navigate(['/emergency'])
 }

 goTvGuide(){
   //window.open('https://home.myt.mu/watchtv/tvguide.php', '_blank')
   let url = 'https://home.myt.mu/watchtv/tvguide.php';
   let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
 }

 goConverter(){
  //window.open('https://www.xe.com/currency/mur-mauritian-rupee', '_blank')
  let url = 'https://www.xe.com/currency/mur-mauritian-rupee';
  let target = "_blank";
  this.theInAppBrowser.create(url,target,this.options);
}

goflight(){
  //window.open('https://mauritius-airport.atol.aero/passengers/flights/flight-arrival-search', '_blank')
  //let target = "_blank";
  //this.theInAppBrowser.create(url,target,this.options);
}




}

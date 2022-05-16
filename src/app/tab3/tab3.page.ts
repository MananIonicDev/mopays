import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

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

  public exploreRef: firebase.database.Reference;
  public exploreList = [];
  public advertRef = firebase.database().ref('Adverts/')
  adverts = []
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  constructor(public router: Router, public theInAppBrowser: InAppBrowser) { 
    this.exploreRef = firebase.database().ref('explore');
    this.exploreRef.on('value', messages => {
      let exploresList = [];
      messages.forEach(data => {
        exploresList.push({
          id: data.key,
          backgroundImage: data.val().image,
          name: data.val().name,
        })
      });
      this.exploreList = exploresList;
    });
  }

  goExplore(id: string, name: string){
    this.router.navigate(['/explore-category', {
      id:id,
      name:name
    }])
  }


  goAdsDetails(url: string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
  }

  ngOnInit(){
    this.advertRef.orderByChild('type').equalTo('explore').once('value', adverts => {
      let advertsList = [];
      adverts.forEach(data => {
        advertsList.push({
          id: data.key,
          image: data.val().image,
          type: data.val().type,
          name: data.val().name,
          url: data.val().url,
          description: data.val().description
        })
      });
       this.adverts = advertsList
    })
  }

}


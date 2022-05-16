import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthsProvider } from '../services/auth';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { IonInfiniteScroll } from '@ionic/angular';


export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}


@Component({
  selector: 'app-business-by-category',
  templateUrl: './business-by-category.page.html',
  styleUrls: ['./business-by-category.page.scss'],
})
export class BusinessByCategoryPage implements OnInit  {

  @ViewChild(IonInfiniteScroll, { static: false }) inifiniteScroll: IonInfiniteScroll;
  pic = 'assets/imgs/profile.jpg'
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

  id;
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  dummyBook = Array(10); 
  dummyAds = Array(10);
  bookingList = [];
  advertList = [];
  key='';
  advertRef = firebase.database().ref('Adverts/').orderByChild('type').equalTo('businesscat')
  term = '';
  name;
  public lastKey: string = '';
  public isFinished = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthsProvider, public theInAppBrowser: InAppBrowser
    
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    firebase.database().ref('booking_shop/').orderByChild('category').equalTo(this.id).on('value', resp => {
      this.bookingList = [];
      this.bookingList = snapshotToArray(resp);
      this.dummyBook = [];
    })
    this.advertRef.on('value', resp => {
      this.advertList = [];
      this.advertList = snapshotToArray(resp);
      this.dummyAds = [];
    })
   
   }

  

   goAdsDetails(url){
    //window.open(url, '_blank')
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

  goDetails(id){
    this.router.navigate(['/business-details', {
      id:id
    }])
  }
 
 ngOnInit(){}
  
}
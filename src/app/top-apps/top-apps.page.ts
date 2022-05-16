import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';

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
  selector: 'app-top-apps',
  templateUrl: './top-apps.page.html',
  styleUrls: ['./top-apps.page.scss'],
})
export class TopAppsPage implements OnInit {

  public advertRef = firebase.database().ref('Adverts/')
  adverts = [];
  CategoriesList = [];
  selectedItems = [];
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  optionsess = {
    autoplay: true,
    slidesPerView: 2.4,
    spaceBetween: -5,
  }

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  ref;
  dummy = Array(10);
  term = '';
  billingList = [];
  items = [];

  constructor(public router: Router, public theInAppBrowser: InAppBrowser, public market: Market) {
    this.ref = firebase.database().ref('apps')
    this.ref.on('value', resp => {
      this.billingList = [];
      this.billingList = snapshotToArray(resp);
      this.dummy = [];
      this.items = this.billingList;
    });
    this.ref = firebase.database().ref('app_categories')
    this.ref.on('value', resp => {
      this.CategoriesList = [];
      this.CategoriesList = snapshotToArray(resp);
      this.dummy = [];
      this.selectedItems = this.CategoriesList;
    });
  }

  initializeItems() {
    this.CategoriesList = this.selectedItems;
  }

  goCategory(category) {
    this.initItems();
    this.billingList = this.billingList.filter(data => {
      return data.category === category;
    });
  }

  initItems() {
    this.billingList = this.items;
  }

  searchName(ev: any) {
    this.initItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.billingList = this.billingList.filter(data => {
        return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  ngOnInit() {
    this.advertRef.orderByChild('type').equalTo('top-apps').once('value', adverts => {
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
    //console.log(this.contacts);
  }

  goBill(url) {
    let target = "_blank";
    //this.theInAppBrowser.create(url,target,this.options);
    //window.open('market://developer?id=' + url, '_system', 'location=yes');
    this.market.open(url);
  }

  goAdsDetails(id) {
    this.router.navigate(['/ads', {
      id: id,
    }])
  }

}

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';



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
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {


  public advertRef = firebase.database().ref('Adverts/')
  adverts = []
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

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

ref;
dummy = Array(10);
term = '';
billingList = []

  constructor(public router: Router, public theInAppBrowser: InAppBrowser) { 
    this.ref = firebase.database().ref('billing')
    this.ref.on('value', resp => {
      this.billingList = [];
      this.billingList = snapshotToArray(resp);
      this.dummy = [];
      //this.userList = this.selectedItems;
    })
  }

  ngOnInit() {
    this.advertRef.orderByChild('type').equalTo('bill').once('value', adverts => {
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

  goBill(url){
       let target = "_blank";
       this.theInAppBrowser.create(url,target,this.options);
  }

  goAdsDetails(id){
    this.router.navigate(['/ads', {
      id: id,
    }])
  }

}

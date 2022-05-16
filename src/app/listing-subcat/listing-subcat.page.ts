import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import * as firebase from 'firebase/app';




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
  selector: 'app-listing-subcat',
  templateUrl: './listing-subcat.page.html',
  styleUrls: ['./listing-subcat.page.scss'],
})
export class ListingSubcatPage  {


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

  id: any;
  public shopItems: Array<any> = [];
  public selectedItems: Array<any> = [];
  shopItem: AngularFireList<any>;
  shops: any = [];
  name;
  adverts = [];
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };
  public advertRef = firebase.database().ref('Adverts/');

  dummy = Array(10); 
  userList = [];
  

  key='';
  ref;
  
  constructor(
    public database: AngularFireDatabase, public router: Router, 
    public route: ActivatedRoute, public theInAppBrowser: InAppBrowser,
    public loadingCtrl: LoadingController, 
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.ref = firebase.database().ref('classified_subcategory').orderByChild('cat').equalTo(this.id)
    this.ref.on('value', resp => {
      this.userList = [];
      this.userList = snapshotToArray(resp);
      this.dummy = [];
      //this.userList = this.selectedItems;
    })

    this.advertRef.orderByChild('type').equalTo('classcat').once('value', adverts => {
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
      //console.log(this.contacts);
    });
  }

  goAdsDetails(url){
    //window.open(url, '_blank')
    let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
  }

  

  goDetails(id, name, img){
    this.router.navigate(['/listing-by-category', {
      id: id,
      name: name,
      img:img,
    }])
  }

  goSell(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/auth'])
      }  else {
         this.router.navigate(['/listing-sell'])
      }
    })

  }
 
}


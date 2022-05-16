import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AuthsProvider } from '../services/auth';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { IonInfiniteScroll } from '@ionic/angular';
import { DataService } from '../services/data';
//import { DataService } from '../services/data';


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
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit  {

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

  
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  selectedItems = [];
  dummyBook = Array(10); 
  dummyBookCat = Array(10);
  dummyAds = Array(10);
  bookingList = [];
  bookingCatList = [];
  advertList = [];
  key='';
  bookingRef = firebase.database().ref('booking_shop/').orderByKey().limitToFirst(10)
  bookingCatRef = firebase.database().ref('bookings/');
  advertRef = firebase.database().ref('Adverts/').orderByChild('type').equalTo('business')
  term = '';
  shopCreated;
  shopId;
  searchitem;

  listOrder: string = 'oldest';

  public lastKey: string = '';
  public isFinished = false;

  constructor(
    public router: Router,
    public dataService: DataService, 
    public authService: AuthsProvider, public theInAppBrowser: InAppBrowser
    
  ) {
    
   
   }

   goDetails(id){
    this.router.navigate(['/business-details', {
      id:id
    }])
  }


  goAdsDetails(url){
    // window.open(url, '_blank')
     let target = "_blank";
     this.theInAppBrowser.create(url,target,this.options);
   }

 loadShopId(){
   firebase.auth().onAuthStateChanged( user => {
     if (user){
       this.authService.getuserdetails(user.uid).then((res: any) => {
         this.shopCreated = res.shopCreated; //'active',
         this.shopId = res.shopId
       }) 
     } 
   })
 }

 goBookingCat(id, name){
   this.router.navigate(['/business-by-category', {
     id: id,
     name: name
   }])
 }

 
 goMyBooking(){
   this.router.navigate(['/my-shop', {
     id: this.shopId
   }])
  
 }

 initializeItems() {
  this.bookingList = this.selectedItems;
}

searchName(ev: any) {
  this.initializeItems();
  let val = ev.target.value;
  if (val && val.trim() != "") {
    this.bookingList = this.bookingList.filter(data => {
      return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }
}

searchLocation(ev: any) {
  this.initializeItems();
  let val = ev.target.value;
  if (val && val.trim() != "") {
    if (this.searchitem != null) {
      this.bookingList = this.bookingList.filter(data => {
        return data.location.toLowerCase().indexOf(val.toLowerCase()) > -1 && data.name.toLowerCase().indexOf(this.searchitem.toLowerCase()) > -1;
      });
    }
    else {
      this.bookingList = this.bookingList.filter(data => {
        return data.location.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
}

 goBooking(){
   firebase.auth().onAuthStateChanged((user) => {
     if (!user) {
         console.log("not login");
         this.dataService.setRoot('/business-add');
         this.router.navigate(['/login'])
     }  else if(this.shopCreated == 'active') {
        this.router.navigate(['/my-shop', {
          id: this.shopId
        }])
     } else {
       this.router.navigate(['/business-add'])
     }
   })

 }

 
getBusinessList(){
  firebase.database().ref('booking_shop/').orderByKey().limitToFirst(10).on("value", snap => {
    snap.forEach(child => {
      let item = child.val();
      item.key = child.key;
      this.lastKey = child.key;
      this.bookingList.push(item);
    })
    this.dummyBook = [];
    this.selectedItems = this.bookingList;
  })

}

changeOrder(){
  if (this.listOrder === 'reverse'){
    this.listOrder = 'oldest';
  }
  else {
    this.listOrder = 'reverse';
  }
}

doInfinite(event: any){
  firebase.database().ref('booking_shop').orderByKey().startAt(this.lastKey).limitToFirst(5).on("value", snap => {
    event.target.complete();
    if(snap.numChildren() == 1){
      this.inifiniteScroll.disabled = true;
      this.isFinished = true;
    } else {
      snap.forEach(child => {
        if(this.lastKey != child.key){
          let item = child.val();
          item.key = child.key;
          this.lastKey = child.key;
          this.bookingList.push(item);
        }
      })
    }
  })
}
 
 ngOnInit(){
  /*this.bookingRef.on('value', resp => {
    this.bookingList = [];
    this.bookingList = snapshotToArray(resp);
    this.dummyBook = [];
  })*/
  this.getBusinessList()
  this.bookingCatRef.on('value', resp => {
    this.bookingCatList = [];
    this.bookingCatList = snapshotToArray(resp);
    this.dummyBookCat = [];
  })
  this.advertRef.on('value', resp => {
    this.advertList = [];
    this.advertList = snapshotToArray(resp);
    this.dummyAds = [];
  })
 }
  
}
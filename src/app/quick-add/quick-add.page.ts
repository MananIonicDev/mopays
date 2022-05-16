import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AuthsProvider } from '../services/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.page.html',
  styleUrls: ['./quick-add.page.scss'],
})
export class QuickAddPage implements OnInit {

 
  currentUserId;
  displayName;
  photoURL;
  shopCreated;
  shopId;
  segmentType;
  serviceCreated;
  serviceId;

  constructor(public router: Router, public authService: AuthsProvider, public alertCtrl: AlertController) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
        this.loaduserdetails(user.uid);
      } 
    })
  }

  loaduserdetails(id) {
      this.authService.getuserdetails(id).then((res: any) => {
        this.displayName = res.displayName;
        this.photoURL = res.photoURL;
        //this.shopCreated = res.shopCreated; //'active',
        //this.shopId = res.shopId
      }) 
  }

  loadShopId(){
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
        this.authService.getuserdetails(user.uid).then((res: any) => {
          this.shopCreated = res.shopCreated; //'active',
          this.shopId = res.shopId;
          this.serviceCreated = res.serviceCreated; //'active',
          this.serviceId = res.serviceId
        }) 
      } 
    })
  }

  ionViewDidEnter(){
    this.loadShopId()
  }

  goEmmergency(){
    this.router.navigate(['/emergency'])
  }

  goEssential(){
    this.router.navigate(['/essentials'])
  }

  goWeather(){
    this.router.navigate(['/weather'])
  }

  goBill(){
    this.router.navigate(['/bill'])
  }

  goEvent(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
         this.router.navigate(['/event-add'])
      }
    })
  }

  goJob(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
         this.router.navigate(['/jobs-add'])
      }
    })
  }
 

  goSell(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
         this.router.navigate(['/listing-sell'])
      }
    })
  }
  

  goFeed(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/guest-feed-add']);
      }  else {
         this.router.navigate(['/feed-add'])
      }
    })

  }

  

  goGallery(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
        this.router.navigate(['/gallery-post'])
      }
    })

  }

  goCreateGroup(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
        this.router.navigate(['/group-create'])
      }
    })

  }

 
  goBooking(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else if(this.shopCreated == 'active') {
         this.router.navigate(['/business-my', {
           id: this.shopId
         }])
      } else {
        this.router.navigate(['/business-add'])
      }
    })

  }

  
  goService(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else if(this.serviceCreated == 'active') {
         this.router.navigate(['/service-my', {
           id: this.serviceId
         }])
      } else {
        this.router.navigate(['/service-add'])
      }
    })

  }
}

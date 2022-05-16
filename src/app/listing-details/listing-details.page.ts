import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.page.html',
  styleUrls: ['./listing-details.page.scss'],
})
export class ListingDetailsPage implements OnInit {

  avatar = "assets/imgs/profile.jpg"

  lat: number = 51.678418;
  lng: number = 7.809007;
  height = 0;
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  currentUserId;
  itemsComment = [];
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  shareUrl = "https://mopays.app";

  constructor(public platform: Platform, public route: ActivatedRoute, public alertCtrl: AlertController,
    public db: AngularFireDatabase, public toastCtrl: ToastController, public navCtrl: NavController,
    public router: Router, public callNumber: CallNumber, public socialSharing: SocialSharing) { 
    console.log(platform.height());
    this.height = platform.height() - 10;
  }

  
  callNo(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      header: 'Delete your Item',
      message: 'Are you sure you want to delete your Item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes Delete',
          handler: () => {
            this.deleteShop()
          }
        }
      ]
    });
    alert.present();
  }

  deleteShop(){
    this.id = this.route.snapshot.paramMap.get('id');
    firebase.database().ref('items_sell').child(this.id).remove()
    this.navCtrl.pop()
    this.showToast('item deleted')
  }

  shareSheetShareImageText(img, text) {
    console.log(img, text)
    this.socialSharing.share(text, "MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/items_sell/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.images = data.images;
        this.items["$key"] = this.id;
      }
    });
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
      } 
    });
    this.getComment();
  }

  getComment() {
    firebase.database().ref("/items_sell/" + this.id + '/comment/').on('value', snapshot => {
      let feeds = [];
      snapshot.forEach(feed => {
        let item = feed.val();
        item.key = feed.key;
        item.userId = feed.val().userId;
        firebase.database().ref('users/' + item.userId).once('value', (snapshot) => {
          item.displayName = snapshot.val().displayName;
          item.photoURL = snapshot.val().photoURL;
        });
        feeds.push(item);
        this.itemsComment = feeds;
        //this.dummyBook = [];
      });
    });
  }

  viewProfiles(userId){
    if(this.currentUserId == userId){
      this.router.navigate(['/my-profile'])
    } else {
      this.router.navigate(['/users-details', {
        id: userId
      }])
    }
  }

  /*viewProfiles(userId){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
         this.viewUserProfile(userId)
      }
    })

  }*/

  goComment(userId) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/listing-comment', {
          id: this.id,
          userId: userId
        }])
      }
    })
  }
  

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActionSheetController, Platform, ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  IAoptions: InAppBrowserOptions = {
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

  avatar = "assets/imgs/profile.jpg"
  height = 0;
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  @Output() onChangeScroll = new EventEmitter();

  itemProduct: AngularFireObject<any>;
  public itemsProduct: any = [];
  itemsComment = [];
  currentUserId: any;
  shareUrl = "https://mopays.app";

  constructor(public platform: Platform, public route: ActivatedRoute, public router: Router, public socialSharing: SocialSharing,
    public db: AngularFireDatabase, public alertCtrl: AlertController, public callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController, public theInAppBrowser: InAppBrowser,
    public modalCtrl: ModalController) {
    //console.log(platform.height());
    this.height = platform.height() - 10;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserId = user.uid
      }
    })
  }



  callNo(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }


  deleteShop() {
    let myId = firebase.auth().currentUser.uid
    firebase.database().ref('service_provider').child(this.id).remove()
    firebase.database().ref('users').child(myId).update({
      shopCreated: '',
      shopId: ''
    })
  }

  async zoomImage(img: string) {
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      cssClass: 'transparent-modal',
      componentProps: { img: img, id: this.id }
    })
    modal.present();
  }




  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Sh',
        role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Call Planner',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Interested',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  goComment(userId) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/service-comment', {
          id: this.id,
          userId: userId
        }])
      }
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/service_provider/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        //this.images = data.images;
        this.items["$key"] = this.id;
      }
    })


    firebase.database().ref("/service_provider/" + this.id + '/product/').on('value', snapshot => {
      this.itemsProduct = [];
      snapshot.forEach(snap => {
        this.itemsProduct.push({
          category: snap.val().category,
          id: snap.key,
          name: snap.val().name,
          image: snap.val().image,
          description: snap.val().description,
        });
      });
    });


    /*firebase.database().ref("/service_provider/" + this.id + '/comment/').on('value', snapshot =>{
      this.itemsComment = [];
      snapshot.forEach( snap =>{
        this.itemsComment.push({
          category: snap.val().category,
          id: snap.key,
          displayName: snap.val().displayName,
          description: snap.val().description,
          photoURL: snap.val().photoURL,
          time: snap.val().time,
          rate: snap.val().rate,
        });
      });
    });*/
    this.getComment()
  }

  goLink(link) {
    let target = "_blank";
    this.theInAppBrowser.create(link, target, this.IAoptions);
  }

  goWhatsApp(number) {
    window.open('https://wa.me/' + number)
  }

  getComment() {
    firebase.database().ref("/service_provider/" + this.id + '/comment/').on('value', snapshot => {
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


  shareSheetShareImageText(img, text) {
    console.log(img, text)
    this.socialSharing.share(text, "MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  logScrolling(event) {
    this.onChangeScroll.emit(event.detail.scrollTop < 200);
  }

  /*async viewProduct(id, name, image, description){
    const modal = await this.modalCtrl.create({
    component: ProductDetailsPage,
    cssClass: 'half-modals',
    componentProps: {
      //id: id,
      //shopId: this.id,
      details: {name, id, image, description}
   }
  });
  modal.present();
  
 
 
  }*/

  goProduct() {
    this.router.navigate(['/service-image', {
      id: this.id
    }])
  }

  addProduct() {
    this.router.navigate(['/service-image-add', {
      id: this.id
    }])
  }

  editBusiness() {
    this.router.navigate(['/service-edit', {
      id: this.id
    }])
  }

  viewProfiles(userId) {
    if (this.currentUserId == userId) {
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
          this.router.navigate(['/auth'])
      }  else {
         this.viewUserProfile(userId)
      }
    })
  
  }*/

}


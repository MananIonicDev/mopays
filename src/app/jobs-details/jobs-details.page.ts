import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { ActionSheetController, Platform, ToastController, NavController, AlertController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.page.html',
  styleUrls: ['./jobs-details.page.scss'],
})
export class JobsDetailsPage implements OnInit {

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
  itemsComment = [];
  @Output() onChangeScroll = new EventEmitter();
  currentUserId;
  shareUrl = "https://mopays.app";

  constructor(public platform: Platform, private photoViewer: PhotoViewer, public router: Router, public route: ActivatedRoute, public toastCtrl: ToastController, public theInAppBrowser: InAppBrowser,
    public navCtrl: NavController, public alertCtrl: AlertController, public socialSharing: SocialSharing,
    public db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    console.log(platform.height());
    this.height = platform.height() - 10;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Share',
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
  logScrolling(event) {
    this.onChangeScroll.emit(event.detail.scrollTop < 200);
  }

  getComment() {
    firebase.database().ref("/jobs/" + this.id + '/comment/').on('value', snapshot => {
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

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/jobs/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        //this.images = data.images;
        this.items["$key"] = this.id;
      }
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserId = user.uid
      }
    });
    this.getComment();
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

  goComment(userId) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/jobs-comment', {
          id: this.id,
          userId: userId
        }])
      }
    })
  }

  viewImage(image) {
    this.photoViewer.show(image, null, { share: true });
  }

  goLink(link) {
    let target = "_blank";
    this.theInAppBrowser.create(link, target, this.IAoptions);
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      header: 'Delete your Job',
      message: 'Are you sure you want to delete your Job?',
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

  shareSheetShare(description) {
    console.log(description)
    this.socialSharing.share(description, "MopaysApp", description, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
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

  deleteShop() {
    firebase.database().ref('jobs').child(this.id).remove()
    this.navCtrl.pop()
    this.showToast('item deleted')
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }



}







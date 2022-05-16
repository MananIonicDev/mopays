import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActionSheetController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  avatar = "assets/imgs/profile.jpg"
  height = 0;
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  shareUrl = "https://mopays.app";
  currentUserId;
  @Output() onChangeScroll = new EventEmitter();

  constructor(public platform: Platform, public route: ActivatedRoute, public router: Router, public socialSharing: SocialSharing,
    public db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) { 
    console.log(platform.height());
    this.height = platform.height() - 10;
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
      } 
    })
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
      },  {
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

  shareSheetShareImageText(img, text) {
    console.log(img, text)
    this.socialSharing.share(text, "MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/events/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        //this.images = data.images;
        this.items["$key"] = this.id;
        console.log('eventItems', this.items)
      }
    })
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
          this.router.navigate(['/auth'])
      }  else {
         this.viewUserProfile(userId)
      }
    })
  
  }*/

}


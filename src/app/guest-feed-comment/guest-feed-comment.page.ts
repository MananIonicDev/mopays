import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { UtilityService } from '../services/utility';
import { formatDate } from '@angular/common';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-guest-feed-comment',
  templateUrl: './guest-feed-comment.page.html',
  styleUrls: ['./guest-feed-comment.page.scss'],
})
export class GuestFeedCommentPage implements OnInit {

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

  postId;
  userId;
  name;
  age;
  ulocation;
  message;
  photoURL;
  displayName;
  feedsComment = [];
  date;
  currentUserId;
  commentLength;
  commentNumber;
  fcm_token;
  dummyBook = Array(10);
  anonymousUser;

  constructor(public actionSheetCtrl: ActionSheetController, public theInAppBrowser: InAppBrowser,
    public router: Router, public util: UtilityService, public alertCtrl: AlertController,
    public route: ActivatedRoute, public authService: AuthsProvider) {
    this.postId = this.route.snapshot.paramMap.get('postId');
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.commentLength = this.route.snapshot.paramMap.get('commentLength');
    this.commentNumber = Number.parseInt(this.commentLength)
    this.authService.getuserdetails(this.userId).then((res: any) => {
      if (res != null) {
        this.fcm_token = res.fcm_token;
      }
      else {
        console.log('anonymous user');
        this.anonymousUser = true;
      }
      //this.photoURL = res.photoURL;
    })
  }

  deleteComment(id, item) {
    firebase.database().ref('/feeds/' + this.postId + '/comments/' + id).remove().then(function () { })
    if (this.commentNumber === 0) {
      firebase.database().ref('/feeds/' + this.postId).update({
        commentLength: 0
      })
    } else {
      firebase.database().ref('/feeds/' + this.postId).update({
        commentLength: this.commentLength - 1
      })
    }
    let index = this.feedsComment.indexOf(item);
    if (index > -1) {
      this.feedsComment.splice(index, 1);
    }
  }

  async presentActionSheet(id, item) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Report Comment',
        role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
          alert('Comment Report successfully')
        }
      },
      // {
      //   text: 'Delete Comment',
      //   handler: () => {
      //     this.deleteComment(id, item);
      //   }
      // }, 
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  send() {
    firebase.database().ref('/feeds/' + this.postId).child('comments').push({
      message: this.message,
      date: firebase.database.ServerValue.TIMESTAMP,
      anonymousUser: true,
      userId: this.userId,
      displayName: this.name,
      age: this.age,
      guestLocation: this.ulocation,
    })
    this.message = '';
    this.name = '';
    this.age = '';
    this.ulocation = '';
    firebase.database().ref('/feeds/' + this.postId).update({
      commentLength: this.commentNumber + 1
    });
    if (firebase.auth().currentUser.uid != this.userId && !this.anonymousUser) {
      this.util.sendNotification(`${this.displayName} Comment on your feed post`, 'Mopays', this.fcm_token).subscribe((data) => {
        console.log('send notifications', data);
      }, error => {
        console.log(error);
      });
      firebase.database().ref('notices').push({
        read: false,
        senderId: firebase.auth().currentUser.uid,
        displayName: this.name,
        ownerId: this.userId,
        postId: this.postId,
        typer: 'comment',
        time: firebase.database.ServerValue.TIMESTAMP,
        type: 'feed'
      })
    }
  }

  goLink(){
    let target = "_blank";
    let link = 'https://www.mopays.com/tos';
    this.theInAppBrowser.create(link,target,this.options);
  }

  goEmergency() {
    this.router.navigate(['/emergency']);
  }

  getComment() {
    firebase.database().ref('/feeds/' + this.postId).child('comments').on('value', snapshot => {
      let feeds = [];
      snapshot.forEach(feed => {
        let item = feed.val();
        item.key = feed.key;
        item.userId = feed.val().userId;
        item.anonymousUser = feed.val().anonymousUser;
        if (!item.anonymousUser) {
          firebase.database().ref('users/' + item.userId).once('value', (snapshot) => {
            item.displayName = snapshot.val().displayName;
            item.photoURL = snapshot.val().photoURL;
          });
        }
        feeds.push(item);
        this.feedsComment = feeds;
        this.dummyBook = [];
      });
    });
  }

  viewProfiles(userId) {
      this.router.navigate(['/users-details', {
        id: userId
      }]);
  }

  async anonymousProfile() {
    this.alertCtrl.create({
      header: 'Anonymous User',
      message: 'This user is not registered.',
      backdropDismiss: false,
      buttons: [{
        text: 'Dismiss',
        role: 'cancel',
        handler: () => {
          console.log('Alert Dismissed!');
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  ngOnInit() {
    this.getComment();
    this.date = new Date();
    this.date = formatDate(this.date, 'yyMdSSS', 'en-US');
    this.userId = 'anonymous' + this.date;
  }

}

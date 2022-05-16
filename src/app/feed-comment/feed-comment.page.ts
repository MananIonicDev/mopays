import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { UtilityService } from '../services/utility';

@Component({
  selector: 'app-feed-comment',
  templateUrl: './feed-comment.page.html',
  styleUrls: ['./feed-comment.page.scss'],
})
export class FeedCommentPage implements OnInit {

  postId;
  userId;
  message;
  photoURL;
  displayName;
  feedsComment = [];
  currentUserId;
  commentLength;
  commentNumber;
  fcm_token;
  dummyBook = Array(10);


  constructor(public actionSheetCtrl: ActionSheetController,
    public router: Router, public util: UtilityService,
    public route: ActivatedRoute, public authService: AuthsProvider) {
    this.postId = this.route.snapshot.paramMap.get('postId');
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.commentLength = this.route.snapshot.paramMap.get('commentLength');
    this.commentNumber = Number.parseInt(this.commentLength)
    this.authService.getuserdetails(this.userId).then((res: any) => {
      this.fcm_token = res.fcm_token;
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
    // })
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
      }, {
        text: 'Delete Comment',
        handler: () => {
          this.deleteComment(id, item)
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

  send() {
    firebase.database().ref('/feeds/' + this.postId).child('comments').push({
      message: this.message,
      date: firebase.database.ServerValue.TIMESTAMP,
      photoURL: this.photoURL,
      userId: firebase.auth().currentUser.uid,
      displayName: this.displayName,
    })
    this.message = ''
    firebase.database().ref('/feeds/' + this.postId).update({
      commentLength: this.commentNumber + 1
    })
    if (firebase.auth().currentUser.uid != this.userId) {
      this.util.sendNotification(`${this.displayName} Comment on your feed post`, 'Mopays', this.fcm_token).subscribe((data) => {
        console.log('send notifications', data);
      }, error => {
        console.log(error);
      });
      firebase.database().ref('notices').push({
        read: false,
        senderId: firebase.auth().currentUser.uid,
        displayName: this.displayName,
        ownerId: this.userId,
        postId: this.postId,
        typer: 'comment',
        time: firebase.database.ServerValue.TIMESTAMP,
        photoURL: this.photoURL,
        type: 'feed'
      })
    }
  }

  /*getComment(){
    firebase.database().ref('/feeds/' + this.postId).child('comments').on('value', snapshot =>{
      this.feedsComment = [];
      snapshot.forEach( snap =>{
        this.feedsComment.push({
          id: snap.key,
          message: snap.val().message,
          userId: snap.val().userId,
          displayName: snap.val().displayName,
          photoURL: snap.val().photoURL,
          date: snap.val().date
        });
      });
    });
  }*/

  getComment() {
    firebase.database().ref('/feeds/' + this.postId).child('comments').on('value', snapshot => {
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
        this.feedsComment = feeds;
        this.dummyBook = [];
      });
    });
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
          this.router.navigate(['/login'])
      }  else {
         this.viewUserProfile(userId)
      }
    })

  }*/


  ngOnInit() {
    this.getComment()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserId = user.uid
        this.loaduserdetails(user.uid);
      }
    })
  }

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
    })
  }


}

import { Component } from '@angular/core';
import { ModalController, ActionSheetController, AlertController, Platform, ToastController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.page.html',
  styleUrls: ['./feed-details.page.scss'],
})
export class FeedDetailsPage  {

  myphotoURL;
  mydisplayName;
  currentuserId;
  refPost;
  shareUrl = "https://mopays.app"
  slideOptions  = {
    zoom: true
  };
 
  id: any;
  public feeds: any = {};
  feed: AngularFireObject<any>;
  images = [];
  likes = [];
  haveILiked: boolean = false;
  feedsComment = [];
  message: any;
  photoURL;
  displayName;

  zoom: number = 12;
  
  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, 
    public router: Router, public socialSharing: SocialSharing, public platform: Platform,
    public actionSheetCtrl: ActionSheetController, public route: ActivatedRoute, public navCtrl: NavController,
    public modal: ModalController, public db: AngularFireDatabase, public toastCtrl: ToastController) {

      this.id = this.route.snapshot.paramMap.get('id');
      this.feed = db.object("/feeds/" + this.id);
      this.feed.valueChanges().subscribe((data: any) => {
        if (data != null) {
          this.feeds = data;
          this.images = data.images;
          this.likes = data.likes;
          this.feeds["$key"] = this.id;
          for (let i = 0; i < this.likes.length; i++) {
            if (this.likes[i] === firebase.auth().currentUser.uid) {
               this.haveILiked = true;
            }
          }
        }
      })

      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.currentuserId = user.uid
          this.getCurrentUser(user.uid)
        }
      })
  
      this.getComment()
  }

  
  getCurrentUser(myId){
    return firebase.database().ref('users/' + myId).once('value', (snapshot) => {
      //console.log(snapshot.val().name);
      this.mydisplayName = snapshot.val().displayName;
      this.myphotoURL = snapshot.val().photoURL;
      this.displayName = snapshot.val().displayName;
      this.photoURL = snapshot.val().photoURL;
    })
  }
 

 // FEEDS
 
  shareSheetShare(description: string) {
    this.socialSharing.share(description,"MopaysApp", description, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  shareSheetShareImage(img: string){
    this.socialSharing.share(null,"MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  shareSheetShareImageText(img: string, text: string){
    this.socialSharing.share(text,"MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

 
 

  viewUserProfile(userId: string){
    if(this.currentuserId == userId){
      this.router.navigate(['/my-profile'])
    } else {
      this.router.navigate(['/users-details', {
        id: userId
      }])
    }
  }

  viewProfiles(userId: string){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
         this.viewUserProfile(userId)
      }
    })

  }

  async presentActionSheetUser(id: string, description: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Edit Feed',
        role: 'destructive',
        handler: () => {
          this.editFeeds(id)
        }
      },  {
        text: 'Delete Feed',
        handler: () => {
          this.deleteFeeds(id)
        }
      }, 
      {
        text: 'Share',
        handler: () => {
          this.shareSheetShare(description)
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

  editFeeds(id: string){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['login'])
    }  else {
         this.router.navigate(['/feed-edit', {
           id:id,
           //item:item
         }])
     }
   })
  }

  deleteFeeds(id: string){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['login'])
    }  else {
         firebase.database().ref('feeds').child(id).remove().then(function (){})
         this.createToaster('Feed deleted', '3000');
         this.navCtrl.pop()
     }
   })
  }

  async createToaster(message, duration) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  likePost(postId: string, userId: string) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
    }  else {

      if(firebase.auth().currentUser.uid != userId){
      firebase.database().ref('notices').push({
        read: false,
        senderId: firebase.auth().currentUser.uid,
        displayName: this.mydisplayName,
        ownerId: userId,
        postId: postId,
        typer: 'like',
        time: firebase.database.ServerValue.TIMESTAMP,
        photoURL: this.myphotoURL,
        type: 'feed-like'
        })
      }

        let myId = firebase.auth().currentUser.uid;
        let score: any;
        let likes = [];
        this.haveILiked = true;

        firebase.database().ref('/feeds/' + postId).once('value').then(function (snapshot) {
        likes = (snapshot.val() && snapshot.val().likes) || [];
        score = (snapshot.val() && snapshot.val().Score);
        likes.push(myId);
        score = score + 1;

        firebase.database().ref('/feeds/'  + postId).child('likes').set(likes);
        firebase.database().ref('/feeds/'  + postId).child('Score').set(score);
        });
      }
   });
 }

unlikePost(postId: string) { 
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      }  else {
        let myId = firebase.auth().currentUser.uid;
        let score: any;
        let likes = [];
        let updatedLikes = [];
        this.haveILiked = false;
        firebase.database().ref('/feeds/'  + postId).once('value').then(function (snapshot) {
        likes = (snapshot.val() && snapshot.val().likes) || [];
        score = (snapshot.val() && snapshot.val().Score);
        likes.push(myId);

        for (let i = 0; i < likes.length; i++)
        {
            if (likes[i] != myId)
            {
                updatedLikes.push(likes[i]);
            }
        }

        score = score - 1;
        firebase.database().ref('/feeds/'  + postId).child('likes').set(updatedLikes);
        firebase.database().ref('/feeds/'  + postId).child('Score').set(score);
     });
  }
});
}


  getComment(){
    this.id = this.route.snapshot.paramMap.get('id');
    firebase.database().ref('/feeds/' + this.id).child('comments').on('value', snapshot =>{
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
    }

  deleteComment(id: string, item: any){
    this.id = this.route.snapshot.paramMap.get('id');
    firebase.database().ref('/feeds/' + this.id + '/comments/' + id).remove().then(function (){})
    if(this.feeds.commentLength === 0) {
     firebase.database().ref('/feeds/' + this.id).update({
      commentLength: 0
     })
    } else {
      firebase.database().ref('/feeds/' + this.id).update({
        commentLength: this.feeds.commentLength - 1
       })
    }
    let index = this.feedsComment.indexOf(item);
  if (index > -1) {
   this.feedsComment.splice(index, 1);
  }
  // })
  }


  send(){
    this.id = this.route.snapshot.paramMap.get('id');
    firebase.database().ref('/feeds/' + this.id).child('comments').push({
      message: this.message,
      date: firebase.database.ServerValue.TIMESTAMP,
      photoURL: this.photoURL,
      userId: firebase.auth().currentUser.uid,
      displayName: this.displayName,
    })
      this.message = ''
      firebase.database().ref('/feeds/' + this.id).update({
      commentLength: this.feeds.commentLength + 1
    })
    
    } 
}


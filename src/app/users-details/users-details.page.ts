import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, LoadingController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthsProvider } from '../services/auth';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UserModalPage } from '../user-modal/user-modal.page';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation } from '../app.animations';
import { UtilityService } from '../services/utility';
import { UserModalPicturePage } from '../user-modal-picture/user-modal-picture.page';
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
//import { UtilityService } from '../services/utility';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.page.html',
  styleUrls: ['./users-details.page.scss'],
})
export class UsersDetailsPage {

  id: any;
  isFollowing: boolean = false;
  public users: any = {};
  user: AngularFireObject<any>;
  currentUserId;
  followingCount;
  refPost;
  feeditems = [];
  shareUrl = "https://mopays.app"

  datasList = [
    {
      "image": "assets/imgs/background/1.jpg",
      "subject": "How to prevent Coronavirus",
      "date": "24 May 2020"
    },
    {
      "image": "assets/imgs/background/2.jpg",
      "subject": "How to prevent Coronavirus",
      "date": "24 May 2020"
    },
    {
      "image": "assets/imgs/background/3.jpg",
      "subject": "How to prevent Coronavirus",
      "date": "24 May 2020"
    },
  ]

  myfavourItems = [];
  displayName;
  photoURL;
  shops = [];
  fcm_token;
  //public gridImages:Array<any>;
  myfcm_token;
  refPostPhoto;
  feedPhoto = [];
  dummyBook = Array(10);
  zoom: number = 12;
  slideOptions = {
    zoom: true
  };

  options: InAppBrowserOptions = {
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
  //public conversationRef: firebase.database.Reference;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    public emailComposer: EmailComposer,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public util: UtilityService,
    public router: Router,
    public socialSharing: SocialSharing,
    public authService: AuthsProvider,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public theInAppBrowser: InAppBrowser
  ) {


    this.id = this.route.snapshot.paramMap.get('id');
    this.user = db.object("/users/" + this.id);
    this.user.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.users = data;
        this.users["$key"] = this.id;
      }

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.currentUserId = user.uid
          this.db
            .object(
              "/users/" + this.currentUserId + "/following/" + this.id
            )
            .valueChanges()
            .subscribe((res: any) => {
              console.log("fav response--", res);
              if (res != null) {
                this.isFollowing = true;
              } else {
                this.isFollowing = false;
              }
            });
        }
      })

    });

    this.feeditems = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserId = user.uid
      }
    })

    this.getFeed()
    this.getPhotoGallery()


    //let myId = this.currentUserId;
    let bb = this.myfavourItems;
    firebase.database().ref('/users/' + this.id).once('value').then(function (snapshot) {
      let favouritesKey = snapshot.val().favourites || [];
      console.log(favouritesKey)
      for (let i = 0; i < favouritesKey.length; i++) {
        console.log(favouritesKey[i])
        firebase.database().ref('/favourites/' + favouritesKey[i]).once('value').then(function (snapshot) {
          let img = (snapshot.val() && snapshot.val().img) || 'There is no name';
          let name = (snapshot.val() && snapshot.val().name) || 'There is no name';
          bb.push({ "img": img, "name": name });
        })
      }

    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserId = user.uid
        this.loaduserdetails(user.uid);
      }
    })

  }

  async viewMyProfile(img) {
    const modal = await this.modalController.create({
      component: UserModalPage,
      componentProps: { img: img },
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async presentActionSheetReportUser(username) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Report User',
        role: 'destructive',
        handler: () => {
          let email = {
            to: 'hello@mopays.com',
            //cc: 'max@mustermann.de',
            subject: 'Report User',
            body: 'Hello Mopays, I notice the following user ' + username + ' is violating the app Terms of Service.<br/><br/>Thank you',
            isHtml: true
          };

          this.emailComposer.open(email);
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

  getPhotoGallery() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.refPostPhoto = firebase.database().ref('/photo_list').orderByChild('userId').equalTo(this.id);
    this.refPostPhoto.on('value', feedList => {
      let feeds = [];
      feedList.forEach(feed => {
        let item = feed.val();
        item.key = feed.key;
        item.likes = feed.val().likes || [];
        //item.Date = child.val().Date;
        item.haveILiked = feed.val().haveILiked;
        item.userId = feed.val().userId;
        for (let i = 0; i < item.likes.length; i++) {
          if (item.likes[i] === this.currentUserId) {
            item.haveILiked = true;
          }
          firebase.database().ref('users/' + item.userId).once('value', (snapshot) => {
            item.Name = snapshot.val().displayName;
            item.Photo = snapshot.val().photoURL;
          });
        }
        feeds.push(item);
        this.feedPhoto = feeds;
        this.dummyBook = [];
      });
    });
    // });     
  }

  async viewmyImage(key, Name, Photo, image, date, userId, description) {
    const modal = await this.modalController.create({
      component: UserModalPicturePage,
      componentProps: { img: image, photo: Photo, id: key, name: Name, date: date, userId: userId, description: description },
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }



  /*async getGallery(){
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present().then(() => {
      firebase.database().ref('/gallery_list/').orderByChild('userId').equalTo(this.id).on('value', snapshot =>{
        this.shops = [];
        snapshot.forEach( snap =>{
          this.shops.push({
            id: snap.key,
          });
        });
      });
      loader.dismiss();
    });

  }*/

  shareSheetShareImageText(img, text) {
    this.socialSharing.share(text, "MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  shareSheetShareImage(img) {
    this.socialSharing.share(null, "MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  goPhoto() {
    this.router.navigate(['/user-photos', {
      id: this.id
    }])
  }

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
      this.followingCount = res.followingCount;
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
      this.myfcm_token = res.fcm_token
      //console.log(this.followingCount)
    })
  }

  ionViewDidEnter() {
    setInterval(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.currentUserId = user.uid
          this.loaduserdetails(user.uid);
        }
      })
    }, 3000);
  }

  addToFevrt(key, followersCount) {
    //if (this.af.currentUser) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.db
          .object("/users/" + this.currentUserId + "/following/" + key)
          .update({
            photoURL: this.users.photoURL,
            displayName: this.users.displayName,
            uid: this.id
          })
          .then(res => {
            firebase.database().ref("/users/" + this.currentUserId).update({
              followingCount: this.followingCount + 1
            })
            this.db
              .object("/users/" + key + "/followers/" + this.currentUserId)
              .update({
                photoURL: this.photoURL,
                displayName: this.displayName,
                uid: this.currentUserId,
              })
            firebase.database().ref("/users/" + key).update({
              followersCount: followersCount + 1
            })
            this.isFollowing = true;
            this.createToaster("You are now following this user", "3000");
          });
        this.authService.getuserdetails(key).then((res: any) => {
          this.fcm_token = res.fcm_token;
        })
        this.util.sendNotification(`${this.displayName} is following you`, 'Mopays', this.fcm_token).subscribe((data) => {
          console.log('send notifications', data);
        }, error => {
          console.log(error);
        });
        firebase.database().ref('notices').push({
          read: false,
          senderId: this.currentUserId,
          displayName: this.displayName,
          ownerId: key,
          fcm_token: this.myfcm_token,
          postId: this.currentUserId,
          typer: 'follow',
          followersCount: followersCount,
          time: firebase.database.ServerValue.TIMESTAMP,
          photoURL: this.photoURL,
          type: 'follow'
        })
      } else {
        //this.createToaster("please login first", "3000");
        this.router.navigate(['/login'])
      }
    })
  }

  removeFevrt(key, followersCount) {
    if (this.af.currentUser) {
      this.db
        .object("/users/" + this.currentUserId + "/following/" + key)
        .remove()
        .then(() => {
          firebase.database().ref("/users/" + this.currentUserId).update({
            followingCount: this.followingCount - 1
          })
          this.db
            .object("/users/" + key + "/followers/" + this.currentUserId).remove()
          firebase.database().ref("/users/" + key).update({
            followersCount: followersCount - 1
          })
          this.isFollowing = false;
          this.createToaster("You have unfollowed this user", "3000");
        });
    }
  }

  async createToaster(message, duration) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  sendMail(userEmail){
    console.log(userEmail);
    let email = {
      to: userEmail,
      //cc: 'max@mustermann.de',
      subject: '',
      body: '',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }

  goLink(link) {
    let target = "_blank";
    this.theInAppBrowser.create(link, target, this.options);
  }


  goFollowing(name) {
    this.router.navigate(['/following', {
      id: this.id,
      name: name,
    }])
  }

  goFollowers(name) {
    this.router.navigate(['/followers', {
      id: this.id,
      name: name,
    }])
  }






  async presentActionSheetNonUser(id, item, description) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Report Feed',
        role: 'destructive',
        handler: () => {
          alert('Post Report successfully')
        }
      }, {
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

  goComment(postId, userId, commentLength) {
    this.router.navigate(['/feed-comment', {
      postId: postId,
      userId: userId,
      commentLength: commentLength,
    }])
  }

  goCommy(postId, userId, commentLength) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.goComment(postId, userId, commentLength)
      }
    })

  }

  chatWithUser(displayName, userId) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/message-chat', {
          displayName: displayName,
          userId: userId,
        }])
      }
    })
  }



  likePost(post, postId) {

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {

        if (this.currentUserId != post.userId) {
          this.util.sendNotification(`${this.displayName} Comment on your feed post`, 'Mopays', this.fcm_token).subscribe((data) => {
            console.log('send notifications', data);
          }, error => {
            console.log(error);
          });

          firebase.database().ref('notices').push({
            read: false,
            senderId: this.currentUserId,
            displayName: this.displayName,
            ownerId: post.userId,
            postId: postId,
            typer: 'like',
            time: firebase.database.ServerValue.TIMESTAMP,
            photoURL: this.photoURL,
            type: 'feed-like'
          })
        }

        let myId = this.currentUserId;
        let score;
        let likes = [];

        console.log("post: " + post.postId);
        for (let i = 0; i < this.feeditems.length; i++)
          if (this.feeditems[i].postId === postId) {
            console.log("POST FOUND and liked");
            this.feeditems[i].haveILiked = true;
            this.feeditems[i].score++;
            //this.haveILiked = true;
            break;
          }

        let Query = firebase.database().ref('/feeds/' + postId).once('value').then(function (snapshot) {
          likes = (snapshot.val() && snapshot.val().likes) || [];
          score = (snapshot.val() && snapshot.val().Score);
          likes.push(myId);
          score = score + 1;

          firebase.database().ref('/feeds/' + postId).child('likes').set(likes);
          firebase.database().ref('/feeds/' + postId).child('Score').set(score);
        });
      }
    });
  }

  unlikePost(post, postId) {


    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        let myId = this.currentUserId;
        let score;
        let likes = [];
        let updatedLikes = [];

        console.log("post: " + post.postId);
        for (let i = 0; i < this.feeditems.length; i++)
          if (this.feeditems[i].postId === postId) {
            console.log("POST FOUND and unliked");
            this.feeditems[i].haveILiked = false;
            this.feeditems[i].score--;
            //this.haveILiked = false;
            break;
          }

        let Query = firebase.database().ref('/feeds/' + postId).once('value').then(function (snapshot) {
          likes = (snapshot.val() && snapshot.val().likes) || [];
          score = (snapshot.val() && snapshot.val().Score);
          likes.push(myId);


          for (let i = 0; i < likes.length; i++) {
            if (likes[i] != myId) {
              updatedLikes.push(likes[i]);
            }
          }

          score = score - 1;

          firebase.database().ref('/feeds/' + postId).child('likes').set(updatedLikes);
          firebase.database().ref('/feeds/' + postId).child('Score').set(score);
        });
      }
    });
  }

  shareSheetShare(description) {
    this.socialSharing.share(description, "MopaysApp", null, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  getFeed() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.refPost = firebase.database().ref('/feeds').orderByChild('UserId').equalTo(this.id)
    this.refPost.on('value', feedList => {
      let feeds = [];

      feedList.forEach(feed => {
        let likes = feed.val().likes || [];
        let haveILiked = feed.val().haveILiked;

        for (let i = 0; i < likes.length; i++) {
          if (likes[i] === this.currentUserId) {
            haveILiked = true;
          }
        }

        feeds.push({
          postId: feed.key,
          userId: feed.val().UserId,
          score: feed.val().Score,
          description: feed.val().description,
          images: feed.val().images || [],
          video: feed.val().video,
          youvideo: feed.val().youvideo,
          timeStamp: feed.val().Date,
          location: feed.val().location,
          latitude: feed.val().latitude,
          longitude: feed.val().longitude,
          userPhoto: feed.val().Photo,
          userName: feed.val().Name,
          comments: feed.val().comments,
          likes: likes,
          commentLength: feed.val().commentLength,
          haveILiked: haveILiked,
        });
        this.feeditems = feeds;
      });
    });
  }


}



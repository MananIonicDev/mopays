import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, AlertController, Platform, IonInfiniteScroll } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedModalPage } from '../feed-modal/feed-modal.page';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation } from '../app.animations';
import * as lodash from 'lodash';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) inifiniteScroll: IonInfiniteScroll;
  myphotoURL;
  mydisplayName;
  infiniteRest;
  feeditems = [];
  limit: number = 100;
  truncating = true;
  currentuserId;
  refPost;
  shareUrl = "https://mopays.app"
  slideOptions = {
    zoom: true
  };
  public lastKey: string = '';
  public isFinished = false;
  dummyBook = Array(10);
  haveILiked = false;
  allPostList = [];
  Name;
  Photo;
  zoom: number = 12;
  base64;

  catId = null;
  catName = null;

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController,
    public router: Router, public socialSharing: SocialSharing, public platform: Platform,
    public actionSheetCtrl: ActionSheetController, public route: ActivatedRoute,
    public modal: ModalController) {

    this.feeditems = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentuserId = user.uid
        this.getCurrentUser(user.uid)
      }
    })
  }

  ngOnInit() {
    this.catId = this.route.snapshot.paramMap.get('id');
    this.catName = this.route.snapshot.paramMap.get('name');

    if (this.catId === null && this.catName === null) {
      console.log('getFeed is called')
      this.getFeed();
    }
    else {
      console.log('getCatFeed is called')
      this.getCatFeed();
    }
  }




  /*let likes = feed.val().likes || [];
        let haveILiked = feed.val().haveILiked;
 
         for (let i = 0; i < likes.length; i++) {
             if (likes[i] === this.currentuserId) {
                haveILiked = true;
             }
         }*/



  /*getFeed(){
    firebase.database().ref('feeds/').orderByKey().limitToFirst(5).on("value", snap => {
      snap.forEach(child => {
        let item = child.val();
        item.key = child.key;
        this.lastKey = child.key;
        item.likes = child.val().likes || [];
        item.haveILiked = child.val().haveILiked;
        item.Date = child.val().Date;
        item.UserId = child.val().UserId;
        for (let i = 0; i < item.likes.length; i++) {
          if (item.likes[i] === this.currentuserId) {
             item.haveILiked = true;
          }
        firebase.database().ref('users/' + item.UserId).once('value', (snapshot) => {
            item.Name = snapshot.val().displayName;
            item.Photo = snapshot.val().photoURL;
        }); 
      }
      this.feeditems.push(item);
      for (let i = 0; i < this.feeditems.length; i++) {
        this.feeditems.sort(function (a, b) {
            return -(a.Date - b.Date);
        });
    }
      //this.allPostList  = this.feeditems;
      ///this.allPostList = this.allPostList.sort((b, a) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

      //this.deneme.push({key: a.key, ...a.val() as {}})})}).then(c=>this.filterData = this.deneme).then(b=>this.filterData.sort((b, a) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))

      })
      this.dummyBook = [];
    })
  
  }

  
  doInfinite(event: any){
    firebase.database().ref('feeds').orderByKey().startAt(this.lastKey).limitToFirst(5).on("value", snap => {
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
            item.likes = child.val().likes || [];
            item.Date = child.val().Date;
            item.haveILiked = child.val().haveILiked;
            item.UserId = child.val().UserId;
            for (let i = 0; i < item.likes.length; i++) {
              if (item.likes[i] === this.currentuserId) {
                 item.haveILiked = true;
              }
              firebase.database().ref('users/' + item.UserId).once('value', (snapshot) => {
                item.Name = snapshot.val().displayName;
                item.Photo = snapshot.val().photoURL;
            });
          }
          this.feeditems.push(item);
          //this.allPostList  = this.feeditems;
          for (let i = 0; i < this.feeditems.length; i++) {
            this.feeditems.sort(function (a, b) {
                return -(a.Date - b.Date);
            });
          }
          }
        })
      }
    })
  }*/

  /*doInfinite(event: any){
    firebase.database().ref('feeds').orderByKey().startAt(this.lastKey).limitToFirst(5).on("value", snap => {
      event.target.complete();
      if(snap.numChildren() == 1){
        this.inifiniteScroll.disabled = true;
        this.isFinished = true;
      } else {
        let feeds = [];
        snap.forEach(feed => {
          if(this.lastKey != feed.key){
            let item = feed.val();
            item.key = feed.key;
            this.lastKey = feed.val().Date;
            item.likes = feed.val().likes || [];
      //item.Date = child.val().Date;
            item.haveILiked = feed.val().haveILiked;
            item.UserId = feed.val().UserId;
            for (let i = 0; i < item.likes.length; i++) {
              if (item.likes[i] === this.currentuserId) {
                 item.haveILiked = true;
              }
              firebase.database().ref('users/' + item.UserId).once('value', (snapshot) => {
                item.Name = snapshot.val().displayName;
                item.Photo = snapshot.val().photoURL;
            });
      
          }
           feeds.push(item);  
           this.feeditems = feeds;  
      //this.dummyBook = [];
          }
        })
      }
    })
  }*/

  getCatFeed() {
    this.refPost = firebase.database().ref('/feeds/').orderByChild('status').equalTo('Approved')
    this.refPost.on('value', feedList => {
      let feeds = [];

      feedList.forEach(feed => {
        let item = feed.val();
        item.key = feed.key;
        this.lastKey = feed.key;
        item.likes = feed.val().likes || [];
        //item.Date = child.val().Date;
        item.demo = new Date(feed.val().Date).toDateString();
        item.haveILiked = feed.val().haveILiked;
        item.UserId = feed.val().UserId;
        item.Verified = feed.val().Verified;
        item.category = feed.val().category || [];
        for (let i = 0; i < item.likes.length; i++) {
          if (item.likes[i] === this.currentuserId) {
            item.haveILiked = true;
          }
          firebase.database().ref('users/' + item.UserId).once('value', (snapshot) => {
            item.Name = snapshot.val().displayName;
            item.Photo = snapshot.val().photoURL;
          });
        }
        for (let i = 0; i < item.category.length; i++) {
          if (item.category[i] === this.catId) {
            console.log('success')
            feeds.push(item);
          }
        }
        this.feeditems = feeds;
        this.dummyBook = [];
      });
      console.log('feeds', this.feeditems);
      this.toggleVideo();
    });
    // });     
  }

  getFeed() {
    this.refPost = firebase.database().ref('/feeds').orderByChild('status').equalTo('Approved')
    this.refPost.on('value', feedList => {
      let feeds = [];

      feedList.forEach(feed => {
        let item = feed.val();
        item.key = feed.key;
        this.lastKey = feed.key;
        item.likes = feed.val().likes || [];
        //item.Date = child.val().Date;
        item.demo = new Date(feed.val().Date).toDateString();
        item.haveILiked = feed.val().haveILiked;
        item.UserId = feed.val().UserId;
        item.Verified = feed.val().Verified;
        for (let i = 0; i < item.likes.length; i++) {
          if (item.likes[i] === this.currentuserId) {
            item.haveILiked = true;
          }
          firebase.database().ref('users/' + item.UserId).once('value', (snapshot) => {
            item.Name = snapshot.val().displayName;
            item.Photo = snapshot.val().photoURL;
          });
        }
        feeds.push(item);
        this.feeditems = feeds;
        this.dummyBook = [];
      });
      console.log('feeds', feeds);
      this.toggleVideo();
    });
    // });     
  }

  /*getFeed(){
    this.refPost = firebase.database().ref('/feeds')
    this.refPost.on('value', feedList =>{
    let feeds = []; 

    feedList.forEach( feed => {
      this.lastKey = feed.key;
      let likes = feed.val().likes || [];
      let haveILiked = feed.val().haveILiked;
      let UserId = feed.val().UserId;
       
       for (let i = 0; i < likes.length; i++) {
           if (likes[i] === this.currentuserId) {
              haveILiked = true;
           }
      }
      
    feeds.push({
      key: feed.key,
      UserId: feed.val().UserId,
      Score: feed.val().Score,
      description: feed.val().description,
      images: feed.val().images || [],
      video: feed.val().video,
      youvideo: feed.val().youvideo,
      Date: feed.val().Date,
      sPhoto: this.Photo,
      sName: this.Name,
      comments: feed.val().comments,
      likes: likes,
      commentLength: feed.val().commentLength,
      haveILiked: haveILiked,
    });  
      this.feeditems = feeds;  
    }); 
   });
 // });     
}*/

  async zoomImages(img, id) {
    const modal = await this.modalCtrl.create({
      component: FeedModalPage,
      componentProps: { img: img, id: id },
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }


  reportFeeds(id, item) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        // report function here
      }
    })
  }

  saveFeeds(id, item) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        // save function here
      }
    })
  }


  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  oyoyoyo() {
    this.getBase64ImageFromUrl('http://approvaltests.com/images/logo.png')
      .then(result =>
        this.base64 = result,
      )
      .catch(err => console.error(err));
  }

  shareSheetShare(description) {
    this.socialSharing.share(description, "MopaysApp", description, this.shareUrl).then(() => {
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

  shareSheetShareImageText(img, text) {
    this.socialSharing.share(text, "MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    })
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
        this.router.navigate(['/guest-feed-comment', {
          postId: postId,
          userId: userId,
          commentLength: commentLength,
        }]);
      } else {
        this.goComment(postId, userId, commentLength)
      }
    })

  }

  goFeedCategory() {
    this.router.navigate(['/categories-modal']);
  }

  viewProfiles(userId) {
    if (this.currentuserId == userId) {
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


  showModal() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/guest-feed-add']);
      } else {
        this.router.navigate(['/feed-add'])
      }
    })
  }

  async presentActionSheetUser(id, item, description) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Edit Feed',
        role: 'destructive',
        handler: () => {
          this.editFeeds(id, item)
        }
      }, {
        text: 'Delete Feed',
        handler: () => {
          this.deleteFeeds(id, item)
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

  editFeeds(id, item) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['login'])
      } else {
        this.router.navigate(['/feed-edit', {
          id: id,
          item: item
        }])
      }
    })
  }

  deleteFeeds(id, item) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['login'])
      } else {
        firebase.database().ref('feeds').child(id).remove().then(function () { })
        let index = this.feeditems.indexOf(item);
        if (index > -1) {
          this.feeditems.splice(index, 1);
        }
      }
    })
  }


  getCurrentUser(myId) {
    return firebase.database().ref('users/' + myId).once('value', (snapshot) => {
      //console.log(snapshot.val().name);
      this.mydisplayName = snapshot.val().displayName;
      this.myphotoURL = snapshot.val().photoURL;
    })
  }

  Refresh(refresher) {
    console.log('Begin async operation');
    this.feeditems = [];
    this.getFeed()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.target.complete();
    }, 2000);
  }




  likePost(post, postId) {

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {

        if (firebase.auth().currentUser.uid != post.UserId) {
          firebase.database().ref('notices').push({
            read: false,
            senderId: firebase.auth().currentUser.uid,
            displayName: this.mydisplayName,
            ownerId: post.UserId,
            postId: postId,
            typer: 'like',
            time: firebase.database.ServerValue.TIMESTAMP,
            photoURL: this.myphotoURL,
            type: 'feed-like'
          })
        }

        let myId = firebase.auth().currentUser.uid;
        let score;
        let likes = [];

        console.log("post: " + postId);
        for (let i = 0; i < this.feeditems.length; i++)
          if (this.feeditems[i].key === postId) {
            console.log("POST FOUND and liked");
            this.feeditems[i].haveILiked = true;
            this.feeditems[i].Score++;
            //this.haveILiked = true;
            break;
          }

        firebase.database().ref('/feeds/' + postId).once('value').then(function (snapshot) {
          likes = (snapshot.val() && snapshot.val().likes) || [];
          score = (snapshot.val() && snapshot.val().Score);
          likes.push(myId);
          score = score + 1;

          firebase.database().ref('/feeds/' + postId).child('likes').set(likes);
          firebase.database().ref('/feeds/' + postId).child('Score').set(score);
          /*if(firebase.auth().currentUser.uid != post.userId){
          firebase.database().ref('notices').push({
            read: false,
            senderId: firebase.auth().currentUser.uid,
            displayName: this.displayName,
            ownerId: post.userId,
            postId: postId,
            time: firebase.database.ServerValue.TIMESTAMP,
            photoURL: this.photoURL,
            typer: 'like',
            type: 'feed-like'
           })
           }*/
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
        let myId = firebase.auth().currentUser.uid;
        let score;
        let likes = [];
        let updatedLikes = [];

        console.log("post: " + postId);
        for (let i = 0; i < this.feeditems.length; i++)
          if (this.feeditems[i].key === postId) {
            console.log("POST FOUND and unliked");
            this.feeditems[i].haveILiked = false;
            this.feeditems[i].Score--;
            //this.haveILiked = false;
            break;
          }

        firebase.database().ref('/feeds/' + postId).once('value').then(function (snapshot) {
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

  /* 2. Initialize method for YT IFrame API */
  init() {
    var iframes = document.querySelectorAll(".iframe-container div");
    var iframeIds = [];
    console.log('divs', iframes);
    iframes.forEach((iframe) => {
      iframeIds.push(iframe.id);
    });
    console.log('iframes', iframeIds)
    // Return if Player is already created
    if (window['YT']) {
      this.startVideo(iframeIds);
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo(iframeIds);
  }

  toggleVideo() {
    setTimeout(() => {
      this.init()
    })
  }

  startVideo(iframeIds) {
    this.addCss(iframeIds);
    iframeIds.forEach((iframeId) => {
      this.player = new window['YT'].Player(iframeId, {
        width: '95%',
        height: '250px',
        videoId: iframeId,
        playerVars: {
          autoplay: 0,
          controls: 1
        },
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': this.onPlayerReady.bind(this),
        }
      });
    });
  }

  addCss(iframeIds) {
    iframeIds.forEach((iframeId) => {
      document.getElementById(iframeId).style.margin = '10px';
    });
  }

  onPlayerReady(event) {
    // document.getElementById('player').style.margin = '10px';
    // if (this.isRestricted) {
    //   event.target.mute();
    //   event.target.playVideo();
    // } else {
    //   event.target.playVideo();
    // }
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };


}


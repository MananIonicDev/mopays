import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Contact } from '../model/users';
import { ContactList } from '../model/userstwo';
import { Categorys } from '../services/listing-cat';
import { DataService } from '../services/data';
import { AuthsProvider } from '../services/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationHandlerProvider } from '../services/location';
import { ToastController, AlertController, NavController, ModalController, IonInfiniteScroll, ActionSheetController } from '@ionic/angular';
import { RatingModalPage } from '../rating-modal/rating-modal.page';
import * as moment from 'moment';
import { FeedModalPage } from '../feed-modal/feed-modal.page';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation } from '../app.animations';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ApiService } from '../services/article';

declare var google;

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) inifiniteScroll: IonInfiniteScroll;
  myphotoURL;
  mydisplayName;
  infiniteRest;
  feeditems = [];
  announcementsList = [];
  limit: number = 100;
  truncating = true;
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
  anonymousUser;

  public contactsRef = firebase.database().ref('users/').orderByChild("type").equalTo('users').limitToLast(20)
  public contacts: Contact[] = [];
  public contactsList: ContactList[] = [];

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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


  public catArray: Array<any> = [];
  public selectedItems: Array<any> = [];
  favourItems: AngularFireList<any>;
  catList: any = [];
  points;
  rate;
  addonList = [];
  pic = 'assets/profile.jpg';
  currentuserId;
  optionsm = {
    autoplay: true,
    slidesPerView: 2.0,
    spaceBetween: 10,
  };

  optionGallery = {
    autoplay: true,
    slidesPerView: 3.0,
    spaceBetween: 5,
  };

  optionannouncements = {
    slidesPerView: 1.2,
    spaceBetween: 10,
  };

  optionsmo = {
    autoplay: true,
    slidesPerView: 1.7,
    spaceBetween: 2,
  }

  essentials = {
    autoplay: true,
    slidesPerView: 4,
  }

  optionsess = {
    autoplay: true,
    slidesPerView: 2.4,
    spaceBetween: -5,
  }

  optionsmass = {
    autoplay: true,
    slidesPerView: 2.2,
    spaceBetween: -5,
  }

  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  //favouritesKey;
  CategoriesList = [];
  currentUserId;
  displayName;
  anyAdress: any;
  location: any;
  lat: number;
  long: number;
  shopCreated;
  shopId;
  photoURL;
  serviceCreated;
  serviceId;
  pubList: any[] = [];
  pubRef;
  galleryRef;
  galleryList: any[] = [];
  dummy = Array(10);

  refgroupPost;
  favourItemsGroup = [];
  textput = "Join";
  term = '';
  diff;
  dob;
  url;

  essentiaList = [{
    "name": "Top Apps",
    "url": "top-apps",
    "img": "assets/svg/user-interface.svg",
    "type": "page"
  },
  {
    "name": "Pay Bills",
    "url": "bill",
    "img": "assets/svg/calendar.svg",
    "type": "page"
  },
  {
    "name": "Emergency",
    "url": "emergency",
    "img": "assets/svg/emergency.svg",
    "type": "page"
  },
  {
    "name": "Radio",
    "url": "radio",
    "img": "assets/svg/radio.svg",
    "type": "page"
  },
  {
    "name": "Scanner",
    "img": "assets/svg/scanner.svg",
    "type": "page",
    "url": "scan"
  },
  {
    "name": "Weather",
    "url": "weather",
    "img": "assets/svg/weather.svg",
    "type": "page"
  },
  {
    "name": "Lotto",
    "img": "assets/svg/dice.svg",
    "type": "link",
    "link": "https://www.myt.mu/sinformer/loterie/"
  },
  {
    "name": "Traffic",
    "img": "assets/svg/traffic.svg",
    "type": "link",
    "link": "https://www.myt.mu/events/trafficwatch"
  },
  {
    "name": "TV Guide",
    "img": "assets/svg/tv.svg",
    "type": "link",
    "link": "https://home.myt.mu/watchtv/tvguide.php"
  },
  ]


  topFeatures = [{
    "name": "Business",
    "img": "assets/biz.jpg",
    "url": "business"
  },
  {
    "name": "Explore",
    "img": "https://i.ibb.co/tp9gCk1/124325501-697370671183033-4596540796780811676-n.jpg",
    "url": "tabs/tab3"
  },
  {
    "name": "Services",
    "img": "https://i.ibb.co/GswFwTf/annie-gray-WEWTGk-PUVT0-unsplash.jpg",
    "url": "service-view"
  },
  {
    "name": "Jobs",
    "img": "https://i.ibb.co/BrLP6Zq/pexels-marily-torres-776615.jpg",
    "url": "jobs-view"
  },
  {
    "name": "Events",
    "img": "https://i.ibb.co/jy3MBhN/pexels-teddy-2263436.jpg",
    "url": "events"
  },
  {
    "name": "Map",
    "img": "assets/map.jpg",
    "url": "map"
  },
  ]

  public advertRef = firebase.database().ref('Adverts/');
  public adverttwoRef = firebase.database().ref('Adverts/');
  adverts = [];
  advertstwo = [];
  public exploreRef: firebase.database.Reference;
  public exploreList = [];

  refNotify;
  refInbox;
  notifyItems = [];
  inboxItems = [];
  posts = [];

  constructor(public router: Router, public dataService: DataService, public socialSharing: SocialSharing,
    public actionSheetCtrl: ActionSheetController, public emailComposer: EmailComposer, private api: ApiService,
    public locationProvider: LocationHandlerProvider, public geolocation: Geolocation,
    public authService: AuthsProvider, public toastCtrl: ToastController, public camera: Camera,
    public alertCtrl: AlertController, public nav: NavController, public modalCtrl: ModalController,
    public database: AngularFireDatabase, public theInAppBrowser: InAppBrowser) {

    this.feeditems = [];

    this.advertRef.orderByChild('type').equalTo('home').once('value', adverts => {
      let advertsList = [];
      adverts.forEach(data => {
        advertsList.push({
          id: data.key,
          image: data.val().image,
          type: data.val().type,
          name: data.val().name,
          url: data.val().url,
          description: data.val().description
        })
      });
      this.adverts = advertsList
      //console.log(this.contacts);
    });

    this.adverttwoRef.orderByChild('type').equalTo('hometop').once('value', adverts => {
      let advertsLists = [];
      adverts.forEach(data => {
        advertsLists.push({
          id: data.key,
          image: data.val().image,
          type: data.val().type,
          name: data.val().name,
          url: data.val().url,
          description: data.val().description
        })
      });
      this.advertstwo = advertsLists
      //console.log(this.contacts);
    });

    this.exploreRef = firebase.database().ref('explore');
    this.exploreRef.on('value', messages => {
      let exploresList = [];
      messages.forEach(data => {
        exploresList.push({
          id: data.key,
          backgroundImage: data.val().image,
          name: data.val().name,
        })
      });
      this.exploreList = exploresList;
    });
  }

  goExplore(id: string, name: string) {
    this.router.navigate(['/explore-category', {
      id: id,
      name: name
    }])
  }

  getAccouncements() {
    this.refPost = firebase.database().ref('/announcements')
    this.refPost.once('value', feedList => {
      let feeds = [];

      feedList.forEach(feed => {
        let item = feed.val();
        item.key = feed.key;
        item.name = feed.val().name;
        item.image = feed.val().image;
        item.description = feed.val().description;
        item.Date = feed.val().Date;
        feeds.push(item);
        this.announcementsList = feeds;
      });
      console.log('feeds', feeds);
    });
  }

  readMore(item){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(item)
      }
    };
    this.router.navigate(['/details'], navigationExtras);
  }

  /*getNotify(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref('notices').orderByChild('ownerId').equalTo(user.uid).on('value', contacts => {
          let notifyList = [];
          contacts.forEach(data => {
            notifyList.push({
              id: data.key,
              read: data.val().read
            })
          });
           this.notificationsList = notifyList
           //this.notificationsList = notifyList.filter(contact => contact.read === false);
          //console.log(this.notificationsList);
        });
      }
    })
  }*/

  getNotices(id) {
    this.refNotify = firebase.database().ref('notices').orderByChild('ownerId').equalTo(id);
    this.refNotify.on('value', notifyList => {
      let notifysList = [];
      notifyList.forEach(feed => {
        let read = feed.val().read;
        if (read === false) {
          notifysList.push({
            favorId: feed.key,
          });
          this.notifyItems = notifysList;
          console.log(this.notifyItems)
        }
      });
    });
  }

  getInbox(id) {
    this.refInbox = firebase.database().ref('messages').orderByChild('toID').equalTo(id);
    this.refInbox.on('value', notifyList => {
      let list = [];
      notifyList.forEach(feed => {
        let read = feed.val().read;
        if (read === false) {
          list.push({
            favorId: feed.key,
          });
          this.inboxItems = list;
          console.log(this.inboxItems)
        }
      });
    });
  }


  getPosts(){
    this.api.getPosts(1).subscribe(
      res => {
        console.log('res: ', res);
        
          this.posts = res.posts;
      },
      err => {
        console.log('error: ', err);
      },
      () => {
          console.log('finish loading')
        }
    );
  }


  ngOnInit() {
    //this.getNotify()
    this.getPosts();
    this.getFeed();
    this.getAccouncements();

    let catRes = this.dataService.getCategoryList();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as Categorys);
      })
    })

    this.pubRef = firebase.database().ref('/pub_list')
    this.pubRef.on('value', resp => {
      this.pubList = [];
      this.pubList = snapshotToArray(resp);
      this.dummy = [];
    })

    this.galleryRef = firebase.database().ref('/gallery_list')
    this.galleryRef.once('value', resp => {
      this.galleryList = [];
      this.galleryList = snapshotToArray(resp);
      this.dummy = [];
      console.log('gallery', this.galleryList)
    })

    this.getPeopleExceptme();
    this.getAllPeople();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserId = user.uid
        this.getNotices(user.uid);
        this.getInbox(user.uid);
        this.getCurrentUser(user.uid);
        this.anonymousUser = false;
      }
      else {
        this.anonymousUser = true;
      }
    })

    this.getFavourite();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentuserId = user.uid
      }
    })


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserId = user.uid
      }
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        this.currentUserId = user.uid
        this.loaduserdetails(user.uid);
        this.currentLocation(user.uid);

        this.authService.getuserdetails(user.uid).then((res: any) => {
          this.points = res.points;
          this.rate = res.popseen;
          this.dob = res.dob;
          let a = moment();
          let b = moment(this.dob, 'YYYY');

          this.diff = a.diff(b, 'years'); // calculates patient's age in years
          console.log(this.diff)
          firebase.database().ref('users').child(user.uid).update({
            age: this.diff,
          })
          if (this.rate == false && this.points > 105) {
            this.addRate()
          }
        })

      }
    })
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
        this.feeditems = feeds.reverse();
        this.dummyBook = [];
      });
      console.log('feeds', feeds);
      console.log('feeds', feeds.length);
      this.toggleVideo();
    });
    // });     
  }

  getCurrentUser(myId) {
    return firebase.database().ref('users/' + myId).once('value', (snapshot) => {
      //console.log(snapshot.val().name);
      this.mydisplayName = snapshot.val().displayName;
      this.myphotoURL = snapshot.val().photoURL;
    })
  }

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

  goFeedCategory() {
    this.router.navigate(['/categories-modal']);
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

  async presentActionSheetAnnouncement(description) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
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

  async presentActionSheetNonUser(id, item, description) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Report Feed',
        role: 'destructive',
        handler: () => {
          let email = {
            to: 'hello@mopays.com',
            //cc: 'max@mustermann.de',
            subject: 'Report Feed',
            body: 'Hello Mopays, I notice the following user ' + item + ' is violating the app Terms of Service.<br/><br/>Thank you',
            isHtml: true
          };
       
          this.emailComposer.open(email);
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

  viewProfiles(userId) {
    if (this.currentuserId == userId) {
      this.router.navigate(['/my-profile'])
    } else {
      this.router.navigate(['/users-details', {
        id: userId
      }])
    }
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

  async goToPostDetails(post){
    this.router.navigate(['/news-details', {postId: post.id}])
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

  showModal() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/guest-feed-add'])

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


  postGallery() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/gallery-post'])
      }
    })

  }

  goNotify() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/notifications'])
      }
    })
  }

  async addRate() {
    const modal = await this.modalCtrl.create({
      component: RatingModalPage,
      cssClass: 'dialog-modal'
    });
    return await modal.present();
  }

  goExploreHome() {
    this.router.navigate(['/tabs/tab3'])
  }

  goAllUpload() {
    this.router.navigate(['/quick-add'])
  }

  searchAll() {
    this.router.navigate(['/search-all'])
  }

  goInbox(item) {
    item.forEach(feed => {
      firebase.database().ref('messages').child(feed.favorId).update({ read: true });
      this.inboxItems = [];
    });
    this.router.navigate(['/inbox']);
  }

  goPageFeatures(url) {
    this.router.navigate([url])
  }

  goAdsDetails(url) {
    //window.open(url, '_blank')
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  goGroup() {
    this.router.navigate(['/groups'])
  }

  goJob() {
    this.router.navigate(['/jobs-view'])
  }

  goDetails(key) {
    this.router.navigate(['/pub-details', { id: key }])
  }

  goPub() {
    this.router.navigate(['/pub'])
  }


  goMyProfile() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        //this.router.navigate(['/my-profile'])
        const navData: NavigationExtras = {
          queryParams: {
            from: 'home',
          }
        };
        this.router.navigate(['my-profile'], navData);
      }
    })
  }

  getPeopleExceptme() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.contactsRef.once('value', contacts => {
          let contactsList = [];
          contacts.forEach(data => {
            contactsList.push({
              email: data.val().email,
              displayName: data.val().displayName,
              photoURL: data.val().photoURL,
              about: data.val().about,
              uid: data.key,
              followersCount: data.val().followersCount,
            })
          });
          this.contacts = contactsList.filter(contact => contact.uid !== user.uid);
          console.log(this.contacts);
        });
      }
    })
  }

  getAllPeople() {
    this.contactsRef.once('value', contacts => {
      let contactsList = [];
      contacts.forEach(data => {
        contactsList.push({
          email: data.val().email,
          displayName: data.val().displayName,
          photoURL: data.val().photoURL,
          about: data.val().about,
          uid: data.key,
          followersCount: data.val().followersCount,
        })
      });
      this.contactsList = contactsList
    });
  }


  goRegister() {
    this.router.navigate(['/register'])
  }

  goEmergency() {
    this.router.navigate(['/emergency'])
  }

  goPage(url) {
    this.router.navigate([url])
  }

  goLink(link) {
    let target = "_blank";
    this.theInAppBrowser.create(link, target, this.options);
  }

  goBusiness() {
    this.router.navigate(['/business'])
  }

  goBasicMap() {
    this.router.navigate(['/map'])
  }

  goPeople() {
    this.router.navigate(['/people'])
  }

  goProfile(uid: string) {
    this.router.navigate(['/users-details', {
      id: uid
    }])
  }

  goWeather() {
    this.router.navigate(['/weather'])
  }

  goServicePage() {
    this.router.navigate(['/service-view'])
  }

  goListings() {
    this.router.navigate(['/listings'])
  }

  goSubCat(id, name) {
    this.router.navigate(['/listing-subcat', {
      id: id,
      name: name
    }])
  }


  goTvGuide() {
    let url = 'https://home.myt.mu/watchtv/tvguide.php';
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }


  goFacebook() {
    let url = 'https://facebook.com/mopays';
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  goWhatsApp() {
    window.open('https://wa.me/23052513000')
  }


  goInstagram() {
    let url = 'https://www.instagram.com/mopays.moris/';
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  goTwitter() {
    let url = 'https://twitter.com/mopays2012?';
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  goTraffic() {
    let url = 'https://www.myt.mu/events/trafficwatch';
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  goEssential() {
    this.router.navigate(['/essentials'])
  }

  goNews() {
    this.router.navigate(['/tabs/news'])
  }

  goBill() {
    this.router.navigate(['/bill'])
  }

  goRadio() {
    this.router.navigate(['/radios'])
  }

  showEvent() {
    this.router.navigate(['/events'])
  }


  goGallery() {
    this.router.navigate(['/gallery'])
  }

  goScanner() {
    this.router.navigate(['/scan'])
  }

  goLotery() {
    let url = 'https://www.myt.mu/sinformer/loterie/';
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  selectPhoto() {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      //allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

     this.camera.getPicture(options).then((imgUrl) => {

        this.url = 'data:image/jpeg;base64,' + imgUrl;

        let navigationExtras: NavigationExtras = {
          queryParams: {
            special: this.url
          }
        };

        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            console.log("not login");
            this.router.navigate(['/guest-feed-add'], navigationExtras);
    
          } else {
            this.router.navigate(['feed-add'], navigationExtras);
          }
        });
        
      }, (err) => {
        console.log(JSON.stringify(err))
      });
  }

  currentLocation(userId) {
    // Location sharing function
    this.locationProvider.getLocation().then((data) => {
      // geolocation detect the latitude and Longitude
      // Then google geocoder convert the latitude and longitude to address
      let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      let geocoder = new google.maps.Geocoder;
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      var request = {
        latLng: latLng,
      };
      geocoder.geocode(request, (results, status) => {
        //console.log(JSON.parse(results));
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            console.log(results[1]);
            // the formatted address is gotten
            //this.anyAdress = results[1].formatted_address;
            this.anyAdress = results[1].formatted_address;
          }
          if (results[0]) {
            console.log(results[0]);

          } else {
            console.log("Results not available");
          }
        }
        else {
          console.log("Geocoder failed due to: ", status);
        }
        // latitude, longitude and the address are sent to the chat list server on modal dismiss
        this.location = { lat: data.coords.latitude, long: data.coords.longitude, address: this.anyAdress }
        console.log(this.anyAdress)
        console.log(data.coords.latitude, data.coords.longitude)
        firebase.auth().onAuthStateChanged(user => {
          if (user) { this.currentUserId = user.uid }
          console.log("UID: " + this.currentUserId);
          let ref = firebase.database().ref('users').child(userId);
          ref.update({
            location: this.anyAdress
          }).then(() => {
            //let geoFire = new GeoFire(this.geoRef);
            //let geoRef = geoFire.ref;
            //geoFire.set(this.userId, [this.lat, this.long]).then(() => {
            console.log('success')
          });
        })
      })
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

  /*ionViewDidEnter(){
    this.loadShopId()
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
  }*/



  goGroupDetails(groupId) {
    this.router.navigate(['/group-details', {
      groupId: groupId,
    }])
  }

  editGroup(groupId) {
    this.router.navigate(['/group-edit', {
      groupId: groupId
    }])
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  getFavourite() {
    this.refgroupPost = firebase.database().ref('/groups')
    this.refgroupPost.on('value', groupsList => {
      let groupList = [];
      groupsList.forEach(group => {
        let members = group.val().members || [];
        let haveIJoined = group.val().haveIJoined;
        for (let i = 0; i < members.length; i++) {
          if (members[i] === this.currentuserId) {
            haveIJoined = true;
            this.textput = "Leave"
          }
        }
        groupList.push({
          groupId: group.key,
          userId: group.val().userId,
          name: group.val().name,
          image: group.val().image,
          members: members,
          memberLength: group.val().memberLength,
          description: group.val().description,
          haveIJoined: haveIJoined,
          timeStamp: group.val().timeStamp
        });
        this.favourItemsGroup = groupList;
      });
    });
  }



  groupJoinAlert(id) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.joinGroup(id)
      }
    })
  }

  async presentConfirmLeave(id) {
    let alert = await this.alertCtrl.create({
      header: 'Leave Group',
      message: 'Are you sure to leave Group?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Leave',
          handler: () => {
            this.leaveGroup(id)
            this.nav.pop()
          }
        }
      ]
    });
    alert.present();
  }


  joinGroup(favorId) {
    let myId = firebase.auth().currentUser.uid
    let members = [];
    let groups = [];
    let memberLength;
    for (let i = 0; i < this.favourItemsGroup.length; i++)
      if (this.favourItemsGroup[i].favorId === favorId) {
        console.log("POST FOUND and liked");
        this.favourItemsGroup[i].haveIJoined = true;
        this.textput = "Leave"
        this.favourItemsGroup[i].memberLength++;
        break;
      }

    firebase.database().ref('/groups/' + favorId).once('value').then(function (snapshot) {
      members = (snapshot.val() && snapshot.val().members) || [];
      memberLength = (snapshot.val() && snapshot.val().memberLength);
      members.push(myId);
      memberLength = memberLength + 1;
      firebase.database().ref('/groups/' + favorId).child('members').set(members);
      firebase.database().ref('/groups/' + favorId).child('memberLength').set(memberLength);
    });

    firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
      groups = (snapshot.val() && snapshot.val().groups) || [];
      groups.push(favorId);
      firebase.database().ref('/users/' + myId).child('groups').set(groups);
    });
    this.showToast('You joined group')
  }

  leaveGroup(favorId) {
    let myId = firebase.auth().currentUser.uid;
    let members = [];
    let groups = [];
    let updatedMembers = [];
    let updateUserMember = [];
    let memberLength;


    for (let i = 0; i < this.favourItemsGroup.length; i++)
      if (this.favourItemsGroup[i].favorId === favorId) {
        console.log("POST FOUND and unliked");
        this.favourItemsGroup[i].haveIJoined = false;
        this.textput = "Join"
        this.favourItemsGroup[i].memberLength--;
        break;
      }

    firebase.database().ref('/groups/' + favorId).once('value').then(function (snapshot) {
      members = (snapshot.val() && snapshot.val().members) || [];
      memberLength = (snapshot.val() && snapshot.val().memberLength);
      members.push(myId);
      for (let i = 0; i < members.length; i++) {
        if (members[i] != myId) {
          updatedMembers.push(members[i]);
        }
      }

      memberLength = memberLength - 1;

      firebase.database().ref('/groups/' + favorId).child('members').set(updatedMembers);
      firebase.database().ref('/groups/' + favorId).child('memberLength').set(memberLength);
    });

    firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
      groups = (snapshot.val() && snapshot.val().groups) || [];
      groups.push(favorId);
      for (let i = 0; i < groups.length; i++) {
        if (groups[i] != favorId) {
          updateUserMember.push(groups[i]);
        }
      }
      firebase.database().ref('/users/' + myId).child('groups').set(updateUserMember);
    });
    this.showToast('You leave group')

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

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActionSheetController, Platform, ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
//import { ProductDetailsPage } from '../product-details/product-details.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { ImageModalBusinessPage } from '../image-modal-business/image-modal-business.page';
import { ImagemodalbizproPage } from '../imagemodalbizpro/imagemodalbizpro.page';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation } from '../app.animations';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

declare var google;
let position;

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.page.html',
  styleUrls: ['./business-details.page.scss'],
})
export class BusinessDetailsPage implements OnInit {


  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };
  itemProduct: AngularFireObject<any>;
  public itemsProduct: any = [];
  itemsComment = [];
  start :any;
  // position members
  options: GeolocationOptions;
  currentPos: Geoposition;
  currentUserId;
  shareUrl = "https://mopays.app";

  constructor(public platform: Platform, public route: ActivatedRoute, public router: Router, public theInAppBrowser: InAppBrowser,
    public db: AngularFireDatabase, public alertCtrl: AlertController, public socialSharing: SocialSharing,
    public actionSheetCtrl: ActionSheetController, public callNumber: CallNumber, public emailComposer: EmailComposer,
    public modalCtrl: ModalController, private geolocation: Geolocation, public launchNavigator: LaunchNavigator) { 
    console.log(platform.height());
    this.height = platform.height() - 10;
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
      } 
    })
  }

  deleteShop(){
    let myId = firebase.auth().currentUser.uid
    firebase.database().ref('booking_shop').child(this.id).remove()
    firebase.database().ref('users').child(myId).update({
      shopCreated: '',
      shopId: ''
    })
  }

  addProduct(){
    this.router.navigate(['/business-add-product', {
      id:this.id
    }])
  }

  editBusiness(){
    this.router.navigate(['/business-edit', {
      id:this.id
    }])
  }

  launchNav(lat, long) {
    // launch navigation 
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS,
      start: "" + this.start,
    }

    let destination = [lat, long]
    this.launchNavigator.navigate(destination, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }
 

  callNo(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }



  async zoomImage(img: string){
    const modal = await this.modalCtrl.create({
      component: ImageModalBusinessPage,
      cssClass: 'transparent-modal',
      componentProps: {img: img, id: this.id}
    })
    modal.present();
  }

  async zoomImages(img: string){
    const modal = await this.modalCtrl.create({
      component: ImagemodalbizproPage,
      cssClass: 'transparent-modal',
      componentProps: {img: img, id: this.id}
    })
    modal.present();
  }


  /*async zoomImages(img: string) {
    this.id = this.route.snapshot.paramMap.get('id');
    const modal = await this.modalCtrl.create({
      component: ImagemodalbizproPage,
      componentProps: {img: img, id: this.id},
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }*/



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
 
  goComment(userId){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
        }  else { 
          this.router.navigate(['/business-comment', {
            id: this.id,
            userId: userId
          }])
        }
      })  
  }

  ngOnInit() {
    this.getUserPosition()
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/booking_shop/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.images = data.images;
        this.items["$key"] = this.id;
        this.toggleVideo();
        console.log('businessData', this.items)
      }
    })

  
    firebase.database().ref("/booking_shop/" + this.id + '/product/').on('value', snapshot =>{
  		this.itemsProduct = [];
  		snapshot.forEach( snap =>{
  			this.itemsProduct.push({
          category: snap.val().category,
  			  id: snap.key,
	        name: snap.val().name,
	        image: snap.val().image,
	        description: snap.val().description,
	        price: snap.val().price
  			});
  		});
    });
    
    firebase.database().ref("/booking_shop/" + this.id + '/comment/').on('value', snapshot =>{
  		this.itemsComment = [];
  		snapshot.forEach( snap =>{
  			this.itemsComment.push({
          category: snap.val().category,
  			  id: snap.key,
	        displayName: snap.val().displayName,
	        description: snap.val().description,
          photoURL: snap.val().photoURL,
          Verified: snap.val().Verified,
          time: snap.val().time,
          rate: snap.val().rate,
  			});
  		});
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

  goLink(link) {
    let target = "_blank";
    this.theInAppBrowser.create(link, target, this.IAoptions);
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

  /*async viewProduct(id, name, price, image, description){
    const modal = await this.modalCtrl.create({
    component: ProductDetailsPage,
    cssClass: 'half-modals',
    componentProps: {
      //id: id,
      //shopId: this.id,
      details: {name, id, price, image, description}
   }
  });
  modal.present();
  
 
  }*/

  report(username){
    let email = {
      to: 'hello@mopays.com',
      //cc: 'max@mustermann.de',
      subject: 'Report Business',
      body: 'Hello Mopays, I notice the following business ' + username + ' is violating the app Terms of Service.<br/><br/>Thank you',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }

  claim(username){
    let email = {
      to: 'hello@mopays.com',
      //cc: 'max@mustermann.de',
      subject: 'Claim Business',
      body: 'Hello, I found my business ' + username + ' on Mopays App and would like to make changes<br/><br/>Thank you',
      isHtml: true
    };
    this.emailComposer.open(email);
  }



  viewImage(){
    this.router.navigate(['/business-images', {
      id: this.id
    }])
  }

  goProduct(){
    this.router.navigate(['/business-product', {
      id: this.id
    }])
  }

  // method to get user position
  getUserPosition() {
    this.options = {
      enableHighAccuracy: false
    };

    let current: any;

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      position = pos;
      this.currentPos = position;

      console.log(pos);
      this.start = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      //this.addMap(pos.coords.latitude, pos.coords.longitude);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
      ;
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


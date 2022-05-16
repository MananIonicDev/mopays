import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase/app';
import { Camera } from '@ionic-native/camera/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation } from '../app.animations';
import { ExploreImagesPage } from '../explore-images/explore-images.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

declare var google;
let position;

@Component({
  selector: 'app-explore-details',
  templateUrl: './explore-details.page.html',
  styleUrls: ['./explore-details.page.scss'],
})
export class ExploreDetailsPage implements OnInit {

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  avatar = "assets/imgs/profile.jpg"

  lat: number = 51.678418;
  lng: number = 7.809007;
  height = 0;
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };
  start: any;
  // position members
  options: GeolocationOptions;
  currentPos: Geoposition;
  shareUrl = "https://mopays.app";
  itemsComment = [];

  constructor(public platform: Platform, public route: ActivatedRoute, private geolocation: Geolocation,
    public db: AngularFireDatabase, public camera: Camera, public callNumber: CallNumber, public socialSharing: SocialSharing,
    public router: Router, public actionSheetCtrl: ActionSheetController, public modalController: ModalController,
    public launchNavigator: LaunchNavigator) {
    console.log(platform.height());
    //this.height = platform.height() - 10;
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



  callNo(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
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


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/explore_sample/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.images = data.imgs;
        this.items["$key"] = this.id;
        this.toggleVideo();
      }
    })
    this.getUserPosition()

    firebase.database().ref("/explore_sample/" + this.id + '/comment/').on('value', snapshot => {
      this.itemsComment = [];
      snapshot.forEach(snap => {
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

  /*viewImage(){
    this.router.navigate(['/explore-images', {
      id: this.id
    }])
  }*/

  /*async viewImage(item) {
    this.id = this.route.snapshot.paramMap.get('id');
    const modal = await this.modalController.create({
      component: ExploreImagesPage,
      componentProps: {id: this.id, name: item.name, photo: item.photo, date: item.date, src: item.src, description: item.description},
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }*/

  async viewImage(img: string, names, dates, userId) {
    const modal = await this.modalController.create({
      component: ExploreImagesPage,
      cssClass: 'transparent-modal',
      componentProps: { img: img, id: this.id, name: names, date: dates, userId: userId }
    })
    modal.present();
  }


  goComment() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/explore-comment', {
          id: this.id,
        }])
      }
    })
  }


  logScrolling(event) {
    console.log('event')
  }

  showModal() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/explore-submit', {
          id: this.id
        }])
      }
    })
  }


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

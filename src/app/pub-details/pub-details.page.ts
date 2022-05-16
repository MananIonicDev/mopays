import { Component, OnInit } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import videojs from 'video.js';

@Component({
  selector: 'app-pub-details',
  templateUrl: './pub-details.page.html',
  styleUrls: ['./pub-details.page.scss'],
})
export class PubDetailsPage implements OnInit {

  showVideo = true;
  iframeIds = [];

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  vid = "https://www.youtube.com/embed/QF1ex9MybJU";
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  public url: string = "https://www.youtube.com/watch?v=yBVEwRTeEZk";
  appPath: string;
  dataPath: string;
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
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

  constructor(
    public db: AngularFireDatabase,
    public theInAppBrowser: InAppBrowser,
    private navCtrl: NavController,
    public route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    public socialSharing: SocialSharing,
    public callNumber: CallNumber) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/pub_list/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.items["$key"] = this.id;
        this.video = JSON.stringify(data.youtube);
        this.toggleVideo();
      }
    })
    //this.definePaths();
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

  downloadAndOpenPdfBus(brochurelink) {
    window.open(brochurelink, '_blank')
  }

  sanitize(vid) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(vid);
  }

  callNo(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  sharePUB(name, image, website) {
    this.socialSharing.share(null, name, image, website).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  goLink(url) {
    //window.open(url, '_blank')
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  /*definePaths() {
    if (this.platform.is('ios')) {
      this.appPath = this.file.documentsDirectory;
      this.dataPath = this.file.documentsDirectory;

    } else {
      this.appPath = this.file.applicationDirectory;
      this.dataPath = this.file.dataDirectory;

    }
  }

  downloadAndOpenPdf(pdfLink) {
    const transfer = this.transfer.create();
    transfer.download(pdfLink, this.dataPath + 'pubmopays.pdf')
      .then(entry => {
        let url = entry.toURL();
        console.log(url);
        
        this.document.viewDocument(url, 'application/pdf', {});
      });
  }*/

}

import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import { AuthsProvider } from './services/auth';
import { Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
//import { AppRate } from '@ionic-native/app-rate/ngx';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from 'src/environments/environment';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UtilityService } from './services/utility';
import { Location } from '@angular/common';


@Component({ 
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  public selectedIndex = 0;
  pic = 'assets/profile.jpg';
  currentUserId;
  displayName;
  photoURL;
  email;

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

 
  activePath = '';

  pages = [
    {
      name: 'Home',
      icon: 'home',
      path: '/tabs/tab1'
    },
    {
      name: 'Profile',
      icon: 'home',
      path: '/my-profile'
    },
    {
      name: 'Settings',
      icon: 'home',
      path: '/settings'
    }
  ];

  points;
  ourMail: string;
 
  description = 'Mopays is your all-in-one app to simplify your life. From News updates when you wake up to Maps of places near you till radio streaming before you doze off, you get everything you need'
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public emailComposer: EmailComposer,
    public router: Router,
    //public appRate: AppRate,
    public af: AngularFireAuth,
    public appVersion: AppVersion,
    private oneSignal: OneSignal,
    public util: UtilityService,
    public nativeAudio: NativeAudio,
    private _location: Location,
    public alertController: AlertController,
    public theInAppBrowser: InAppBrowser,
    public socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController,
    private statusBar: StatusBar,
    public authService: AuthsProvider,
  ) {
    this.initializeApp();
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'New Notification',
      mode: 'md',
      buttons: [{
        text: 'OK',
        icon: 'volume-mute',
        handler: () => {
          console.log('Delete clicked');
          this.nativeAudio.stop('audio').then(() => console.log('done'), () => console.log('error'));
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.nativeAudio.stop('audio').then(() => console.log('done'), () => console.log('error'));
        }
      }]
    });

    await actionSheet.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
       setTimeout(() => {
        this.splashScreen.hide();
      }, 3000);
      
      this.af.onAuthStateChanged(user => {
        if(user){
          var myStatusRef = firebase.database().ref('users').child(user.uid).child('status');

          var contactRef = firebase.database().ref('.info/connected');
          contactRef.on('value', function (snap){
            if(snap.val() === true){
              var con = myStatusRef;

              con.onDisconnect().remove();

              con.set('online');

              myStatusRef.onDisconnect().set('offline')
            }
          })
          document.onvisibilitychange = (e) => {
            if(document.visibilityState === 'hidden'){
              myStatusRef.set('away')
            } else {
              myStatusRef.set('online')
            }
          }
        }
      })
      console.log('appid', environment.onesignal.appId);
      console.log('googlenumnner', environment.onesignal.googleProjectNumber);
      setTimeout(async () => {
        await this.oneSignal.startInit(environment.onesignal.appId, environment.onesignal.googleProjectNumber);
        this.oneSignal.getIds().then((data) => {
          console.log('iddddd', data);
          localStorage.setItem('fcm', data.userId);
        });
        await this.oneSignal.endInit();
      }, 1000);
      this.nativeAudio.preloadSimple('audio', 'assets/alerts.mp3').then((data: any) => {
        console.log('dupletx', data);
      }, error => {
        console.log(error);
      }).catch(error => {
        console.log(error);
      });
      this.oneSignal.handleNotificationReceived().subscribe(data => {
        console.log('got order', data);
        //this.nativeAudio.play('audio', () => console.log('audio is done playing')).catch(error => console.log(error));
        //this.nativeAudio.setVolumeForComplexAsset('audio', 1);
        //this.presentActionSheet();
      });
      this.oneSignal.inFocusDisplaying(2);

      /*this.platform.backButton.subscribe(async () => {
        console.log('asd', this.router.url, 'ad', this.router.isActive('/tabs/', true))
        if (this.router.url.includes('/tabs/') || this.router.url.includes('/login')) {
          navigator['app'].exitApp();
        }
      });*/

      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        console.log('Back press handler!');
        if (this._location.isCurrentPathEqualTo('/tabs/tab1')) {
  
          // Show Exit Alert!
          console.log('Show Exit Alert!');
          this.showExitConfirm();
          processNextHandler();
        } else {
  
          // Navigate to back page
          console.log('Navigate to back page');
          this._location.back();
  
        }
  
      });
  
      this.platform.backButton.subscribeWithPriority(5, () => {
        console.log('Handler called to force close!');
        this.alertController.getTop().then(r => {
          if (r) {
            navigator['app'].exitApp();
          }
        }).catch(e => {
          console.log(e);
        })
      });
    });

  }

  

 openHome(){
   //this.router.navigate(['/tabs/home'])
   this.router.navigate(['/tabs/tab1'])
 }
 openNotify(){
  this.router.navigate(['/notifications'])
 }

 openProfile(){
  const navData: NavigationExtras = {
    queryParams: {
      from: 'menu',
    }
  };
  this.router.navigate(['my-profile'], navData);
 }

 openBookmarks(){
  this.router.navigate(['/news-bookmark'])
 }
 openSettings(){
  this.router.navigate(['/settings'])
 }
 openFAQ(){
  this.router.navigate(['/faq'])
 }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
        setTimeout(()=>{ 
          this.loaduserdetails(user.uid); 
        }, 3000);
      } 
    })
  }

  /*ionViewDidEnter(){
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
        setTimeout(()=>{ 
          this.loaduserdetails(user.uid); 
        }, 3000);
      } 
    })
  }*/

  loaduserdetails(id) {
      this.authService.getuserdetails(id).then((res: any) => {
        this.displayName = res.displayName;
        this.photoURL = res.photoURL;
        this.email = res.email;
        this.points = res.points
      }) 
  }

  goLogin(){
    this.router.navigate(['/login']) 
  }

  logOut(){
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/login'])
      localStorage.removeItem('uid')
    })
  }

  /*openChat(){
    this.router.navigate(['/inbox']) 
  }*/

  shareSheetShare(){
    this.socialSharing.share(this.description,"MopaysApp", null, 'https://play.google.com/store/apps/details?id=io.ionicmopaysnewscom.starter&hl=en').then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
    
  }

  aboutUs(){
   //window.open('https://www.mopays.com/about/', '_blank')
    let url = 'https://www.mopays.com/about/';
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);

  }

  Terms(){
   // window.open('https://www.mopays.com/tos/', '_blank')
    let url = 'https://www.mopays.com/tos/';
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

  sendBrand(){
   // window.open('https://mopays.com/brand-partnerships/', '_blank')
    let url = 'https://mopays.com/brand-partnerships/';
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

  sendPrivacyPolicy(){
    // window.open('https://mopays.com/brand-partnerships/', '_blank')
     let url = 'https://mopays.com/privacy-policy/';
     let target = "_blank";
     this.theInAppBrowser.create(url,target,this.options);
   }

  sendEmailFeedBack(){
    let email = {
      to: 'info@mopays.com',
      //cc: 'max@mustermann.de',
      subject: 'Feedback',
      body: 'Hello Mopays, my feedback',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }

  showExitConfirm() {
    this.alertController.create({
      header: 'Exit App',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'YES',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Alert Dismissed!');
          }
        },
        {
          text: 'RATE APP',
          handler: () => {
            if (this.platform.is('ios')) {
              this.theInAppBrowser.create(this.util.packgeName.toString(), "_system");
            } else if (this.platform.is('android')) {
              this.appVersion.getPackageName().then((val) => {
                this.theInAppBrowser.create("https://play.google.com/store/apps/details?id=" + val, "_system");
              });
            }
          }
        },
       ]
    })
      .then(alert => {
        alert.present();
      });
  }
 

  sendEmailBug(){
    let email = {
      to: 'info@mopays.com',
      //cc: 'max@mustermann.de',
      subject: 'Bugs Report',
      body: 'Hello Mopays, bugs detected',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }

  /*showRatePrompt(){
    this.appRate.preferences.storeAppURL = {
      //ios: '< my_app_id >',
      android: 'market://details?id=io.ionicmopaysnewscom.starter'
      //windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
      };
  
      this.appRate.promptForRating(true); 
  }*/
  


/*showRatePrompt(){
  this.appRate.preferences.storeAppURL = {
  ios: 'mopays.meziacommunications.com',
  android: 'market://details?id=io.ionicmopaysnewscom.starter'
  };

  this.appRate.promptForRating(true); 
}*/

showRatePrompt(){
  if (this.platform.is('ios')) {
    this.theInAppBrowser.create(this.util.packgeName.toString(), "_system");
  } else if (this.platform.is('android')) {
    this.appVersion.getPackageName().then((val) => {
      this.theInAppBrowser.create("https://play.google.com/store/apps/details?id=" + val, "_system");
    });
  }
}
 
}


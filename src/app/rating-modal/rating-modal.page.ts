import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
//import { AppRate } from '@ionic-native/app-rate/ngx';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UtilityService } from '../services/utility';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.page.html',
  styleUrls: ['./rating-modal.page.scss'],
})
export class RatingModalPage implements OnInit {

  rate;

  constructor(public modalCtrl: ModalController, 
    public authService: AuthsProvider, public plt: Platform, 
    private appVersion: AppVersion, 
    public util: UtilityService,
    public socialSharing: SocialSharing, 
    public iab: InAppBrowser, ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.authService.getuserdetails(user.uid).then((res: any) => {
          this.rate = res.rate;
        })
      }
    }) 
  }

  noShow(){
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        firebase.database().ref('users').child(user.uid).update({
          popseen: true
       })   
      }
    })
  }

  rateUs(){
    if (this.plt.is('ios')) {
      this.iab.create(this.util.packgeName.toString(), "_system");
    } else if (this.plt.is('android')) {
      this.appVersion.getPackageName().then((val) => {
        this.iab.create("https://play.google.com/store/apps/details?id=" + val, "_system");
      });
    }
  }

  async closeModal(){
    const onClosedData: string = 'Wrapped up';
    await this.modalCtrl.dismiss(onClosedData)
  }

  /*showRatePrompt(){
    this.appRate.preferences.storeAppURL = {
    ios: 'mopays.meziacommunications.com',
    android: 'market://details?id=io.ionicmopaysnewscom.starter'
    };
  
    this.appRate.promptForRating(true); 
  }*/

  async dismissnow(){
    await this.modalCtrl.dismiss()
  }

  goRating(){
    this.noShow()
    this.rateUs()
  }


}

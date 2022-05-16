import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../services/event';
import { DataService } from '../services/data';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import * as firebase from 'firebase/app';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {

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

  //public advertRef = firebase.database().ref('Adverts/')
  adverts = []
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  term="";

eventList = []



  constructor(public router: Router, public dataService: DataService, 
    public theInAppBrowser: InAppBrowser, 
    public navCtrl: NavController, public toastCtrl: ToastController,
    public alertCtrl: AlertController) { 
   
  }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        //this.currentuserId = user.uid
        let itemRes = this.dataService.getMyEventList(user.uid);
        itemRes.snapshotChanges().subscribe(res => {
          this.eventList = [];
          res.forEach(item => {
            let a = item.payload.toJSON();
            a['$key'] = item.key;
            this.eventList.push(a as Event);
          })
        })
      
      }
    })
  }
  
  
    goAdsDetails(url){
      //window.open(url, '_blank')
      let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
    }

    async presentConfirm(key) {
      let alert = await this.alertCtrl.create({
        header: 'Delete your event',
        message: 'Are you sure you want to delete your event?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes Delete',
            handler: () => {
              this.deleteJob(key)
            }
          }
        ]
      });
      alert.present();
    }
  
    deleteJob(key){
      firebase.database().ref('events').child(key).remove()
      this.navCtrl.pop()
      this.showToast('item deleted')
    }

    async showToast(message) {
      let toast = await this.toastCtrl.create({
        message: message,
        duration: 3000,
      });
      toast.present();
    }

  
  onItemEvent(id){
    this.router.navigate(['/event-details', {
      id:id
    }])
  }

  goAddEvent(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
        }  else { 
          this.router.navigate(['/event-add'])
        }
      })  
  }
 

}




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { ToastController, NavController } from '@ionic/angular';
import { UtilityService } from '../services/utility';

@Component({
  selector: 'app-business-comment',
  templateUrl: './business-comment.page.html',
  styleUrls: ['./business-comment.page.scss'],
})
export class BusinessCommentPage implements OnInit {

  id;
  description: any = '';
  rate = 1;
  photoURL;
  displayName;
  verified;
  ratting: any;
  totalRatting: any;
  userId;
  fcm_token;

  constructor(public route: ActivatedRoute, public toastCtrl: ToastController,
    public authService: AuthsProvider, public navCtrl: NavController, public util: UtilityService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userId = this.route.snapshot.paramMap.get('userId');
      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.authService.getuserdetails(user.uid).then((res: any) => {
            this.photoURL = res.photoURL; //'active',
            this.displayName = res.displayName;
            this.verified = res.verified;
          }) 
        } 
      })

      this.authService.getshopdetails(this.id).then((res: any) => {
        this.ratting = res.ratting;
        this.totalRatting = res.totalRatting;
      }) 

      this.authService.getuserdetails(this.userId).then((res: any) => {
        this.fcm_token = res.fcm_token; //'active',
      }) 
  }

  onClick(val) {
    this.rate = val;
  }

  onChange(val) {
    console.log(val);
  }

  

  sendComment(){
    const myRate = (this.ratting * this.rate);
    let totalRatting = Math.round((this.totalRatting * 5) / myRate);
    console.log('total', totalRatting);
    if (!totalRatting) {
      totalRatting = this.rate;
    }
    firebase.database().ref('/booking_shop/' + this.id).child('comment').push({
      userId: firebase.auth().currentUser.uid,
      description: this.description,
      photoURL: this.photoURL,
      rate: this.rate,
      displayName: this.displayName,
      Verified: this.verified,
      time: firebase.database.ServerValue.TIMESTAMP
    })
    firebase.database().ref('/booking_shop/' + this.id).update({
      ratting: this.ratting + 1,
      totalRatting: totalRatting,
    })
    if(firebase.auth().currentUser.uid != this.userId){
    this.util.sendNotification( `${this.displayName} Comment on your business`, 'New Comment on your Business', this.fcm_token).subscribe((data) => {
        console.log('send notifications', data);
       }, error => {
       console.log(error);
    });
    firebase.database().ref('notices').push({
      read: false,
      senderId: firebase.auth().currentUser.uid,
      displayName: this.displayName,
      ownerId: this.userId,
      time: firebase.database.ServerValue.TIMESTAMP,
      photoURL: this.photoURL,
      postId: this.id,
      typer: 'comment',
      type: 'business'
    })
  }
    this.navCtrl.pop();
    this.showToast('Comment sent'); 
}

async showToast(message) {
 let toast = await this.toastCtrl.create({
   message: message,
   duration: 3000,
 });
 toast.present();
}


}

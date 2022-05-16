import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { ToastController, NavController } from '@ionic/angular';
import { UtilityService } from '../services/utility';

@Component({
  selector: 'app-listing-comment',
  templateUrl: './listing-comment.page.html',
  styleUrls: ['./listing-comment.page.scss'],
})
export class ListingCommentPage implements OnInit {

  
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
    this.userId = this.route.snapshot.paramMap.get('userId')
    this.id = this.route.snapshot.paramMap.get('id');
      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.authService.getuserdetails(user.uid).then((res: any) => {
            this.photoURL = res.photoURL; //'active',
            this.displayName = res.displayName;
              if (res.verified != null){
              this.verified = res.verified;
            }
            else {
              this.verified = '';
            }
          }) 
        } 
      })

      this.authService.getProviderDetails(this.id).then((res: any) => {
        this.ratting = res.ratting;
        this.totalRatting = res.totalRatting;
      })
      
      this.authService.getuserdetails(this.userId).then((res: any) => {
        this.fcm_token = res.fcm_token;
        //this.photoURL = res.photoURL;
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
    firebase.database().ref('/items_sell/' + this.id).child('comment').push({
      userId: firebase.auth().currentUser.uid,
      description: this.description,
      photoURL: this.photoURL,
      rate: this.rate,
      displayName: this.displayName,
      Verified: this.verified,
      time: firebase.database.ServerValue.TIMESTAMP
    })
    if(firebase.auth().currentUser.uid != this.userId){
      this.util.sendNotification( `${this.displayName} Comment on your announces item`, 'New Comment on your Announces item', this.fcm_token).subscribe((data) => {
        console.log('send notifications', data);
       }, error => {
       console.log(error);
    });
    firebase.database().ref('notices').push({
      read: false,
      senderId: firebase.auth().currentUser.uid,
      displayName: this.displayName,
      ownerId: this.userId,
      postId: this.id,
      time: firebase.database.ServerValue.TIMESTAMP,
      photoURL: this.photoURL,
      typer: 'comment',
      type: 'announce'
    })
  }
    /*firebase.database().ref('/users/' + this.userId).child('notificationservice').push({
      date: firebase.database.ServerValue.TIMESTAMP,
      senderName: this.displayName,
      senderPhoto: this.photoURL,
      senderId: firebase.auth().currentUser.uid,
      receiverId: this.userId
    })*/
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

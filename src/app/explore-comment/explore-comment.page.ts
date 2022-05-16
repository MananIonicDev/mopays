import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-explore-comment',
  templateUrl: './explore-comment.page.html',
  styleUrls: ['./explore-comment.page.scss'],
})
export class ExploreCommentPage implements OnInit {

  id;
  description: any = '';
  rate = 1;
  photoURL;
  displayName;
  ratting: any;
  totalRatting: any;
  //userId;

  constructor(public route: ActivatedRoute, public toastCtrl: ToastController,
    public authService: AuthsProvider, public navCtrl: NavController) { }

  ngOnInit() {
    //this.userId = this.route.snapshot.paramMap.get('userId')
    this.id = this.route.snapshot.paramMap.get('id');
      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.authService.getuserdetails(user.uid).then((res: any) => {
            this.photoURL = res.photoURL; //'active',
            this.displayName = res.displayName
          }) 
        } 
      })

      this.authService.getExploreDetails(this.id).then((res: any) => {
        this.ratting = res.ratting;
        this.totalRatting = res.totalRatting;
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
    firebase.database().ref('/explore_sample/' + this.id).child('comment').push({
      userId: firebase.auth().currentUser.uid,
      description: this.description,
      photoURL: this.photoURL,
      rate: this.rate,
      displayName: this.displayName,
      time: firebase.database.ServerValue.TIMESTAMP
    })
    firebase.database().ref('/explore_sample/' + this.id).update({
      ratting: this.ratting + 1,
      totalRatting: totalRatting,
    })
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

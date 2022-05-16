import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { UtilityService } from '../services/utility';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificationList = [];
  followingCount;
  displayName;
  photoURL;
  currentUserId;

  constructor(public router: Router, public db: AngularFireDatabase, public util: UtilityService,
    public actionSheetCtrl: ActionSheetController, public authService: AuthsProvider, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.getComment()
  }

  view(item) {
    if (item.type === 'business') {
      this.router.navigate(['/business-details', {
        id: item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({ read: true })
    } else if (item.type === 'feed') {
      this.router.navigate(['/feed-details', {
        id: item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({ read: true })
    } else if (item.type === 'service') {
      this.router.navigate(['/service-details', {
        id: item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({ read: true })
    }

    else if(item.type === 'announce'){
      this.router.navigate(['/listing-details', {
        id:item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({read:true})
    } 

    else if(item.type === 'job'){
      this.router.navigate(['/jobs-details', {
        id:item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({read:true})
    } 

    else if(item.type === 'photo-like'){
      firebase.database().ref('notices').child(item.id).update({read:true})
    } 
    
    else if (item.type === 'feed-like') {
      this.router.navigate(['/feed-details', {
        id: item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({ read: true })
    } else if (item.type === 'follow') {
      this.router.navigate(['/users-details', {
        id: item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({ read: true })
    } else if (item.type === 'followback') {
      this.router.navigate(['/users-details', {
        id: item.postId
      }])
      firebase.database().ref('notices').child(item.id).update({ read: true })
    }
  }

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
      this.followingCount = res.followingCount;
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
      //console.log(this.followingCount)
    })
  }

  ionViewDidEnter() {
    setInterval(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.currentUserId = user.uid
          this.loaduserdetails(user.uid);
        }
      })
    }, 3000);
  }


  async createToaster(message, duration) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }



  followBack(key, item) {
    //if (this.af.currentUser) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.db
          .object("/users/" + firebase.auth().currentUser.uid + "/following/" + key)
          .update({
            photoURL: item.photoURL,
            displayName: item.displayName,
            uid: key
          })
          .then(res => {
            firebase.database().ref("/users/" + firebase.auth().currentUser.uid).update({
              followingCount: this.followingCount + 1
            })
            this.db
              .object("/users/" + key + "/followers/" + firebase.auth().currentUser.uid)
              .update({
                photoURL: this.photoURL,
                displayName: this.displayName,
                uid: firebase.auth().currentUser.uid,
              })
            firebase.database().ref("/users/" + key).update({
              followersCount: item.followersCount + 1
            })
            this.createToaster("You have connected with this user", "3000");
          });
        this.util.sendNotification(`${this.displayName} connected with you back`, 'Mopays', item.fcm_token).subscribe((data) => {
          console.log('send notifications', data);
        }, error => {
          console.log(error);
        });
        firebase.database().ref('notices').push({
          read: false,
          senderId: firebase.auth().currentUser.uid,
          displayName: this.displayName,
          ownerId: key,
          postId: firebase.auth().currentUser.uid,
          time: firebase.database.ServerValue.TIMESTAMP,
          photoURL: this.photoURL,
          type: 'followback'
        })
        firebase.database().ref('notices').child(item.id).update({ typer: 'confirm' })
      } else {
        //this.createToaster("please login first", "3000");
        this.router.navigate(['/login'])
      }
    })
  }

  getComment() {
    let userid = localStorage.getItem('uid')
    firebase.database().ref('notices').orderByChild('ownerId').equalTo(userid).on('value', snapshot => {
      this.notificationList = [];
      snapshot.forEach(snap => {
        this.notificationList.push({
          id: snap.key,
          read: snap.val().read,
          typer: snap.val().typer,
          fcm_token: snap.val().fcm_token,
          senderId: snap.val().senderId,
          displayName: snap.val().displayName,
          ownerId: snap.val().ownerId,
          followersCount: snap.val().followersCount,
          time: snap.val().time,
          photoURL: snap.val().photoURL,
          type: snap.val().type,
          postId: snap.val().postId
        });
      });
    });
  }

  ignoreBack(id, item) {
    firebase.database().ref('notices').child(id).remove().then(function () { })
    let index = this.notificationList.indexOf(item);
    if (index > -1) {
      this.notificationList.splice(index, 1);
    }
  }

  async actions(id, item) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Mark Read',
        role: 'destructive',
        handler: () => {
          firebase.database().ref('notices').child(id).update({
            read: false
          })
        }
      }, {
        text: 'Delete',
        handler: () => {
          firebase.database().ref('notices').child(id).remove().then(function () { })
          let index = this.notificationList.indexOf(item);
          if (index > -1) {
            this.notificationList.splice(index, 1);
          }
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

  async action(id, item) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Mark unread',
        role: 'destructive',
        handler: () => {
          firebase.database().ref('notices').child(id).update({
            read: false
          })
        }
      }, {
        text: 'Delete',
        handler: () => {
          firebase.database().ref('notices').child(id).remove().then(function () { })
          let index = this.notificationList.indexOf(item);
          if (index > -1) {
            this.notificationList.splice(index, 1);
          }
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

}

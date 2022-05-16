import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-groups-my',
  templateUrl: './groups-my.page.html',
  styleUrls: ['./groups-my.page.scss'],
})
export class GroupsMyPage implements OnInit {

  id;


  myfavourItems = [];
  currentuserId;

  constructor(public route: ActivatedRoute, public router: Router,
    public db: AngularFireDatabase, public navCtrl: NavController, 
    public toastCtrl: ToastController) { 
      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.currentuserId = user.uid
          let bb = this.myfavourItems;
          firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
            let favouritesKey = snapshot.val().groups || [];
            console.log(favouritesKey)
            for (let i = 0; i < favouritesKey.length; i++) {
                 console.log(favouritesKey[i])
                 firebase.database().ref('/groups/' + favouritesKey[i]).once('value').then(function (snapshot) {
                  let groupKey = (snapshot.val() && snapshot.val().groupKey);
                  let name = (snapshot.val() && snapshot.val().name);
                  let userId = (snapshot.val() && snapshot.val().userId);
                  let image = (snapshot.val() && snapshot.val().image);
                  let memberLength = (snapshot.val() && snapshot.val().memberLength);
                  bb.push({ "groupKey": groupKey, "name": name, "userId": userId, "image": image, "memberLength": memberLength});
                 })
                // break
                 }
        
            }) 
        }
      })
    }

    viewGroup(groupId){
      this.router.navigate(['/group-details', {
        groupId: groupId,
      }])
    }

  ngOnInit() {
  
  }

  
  




  
}

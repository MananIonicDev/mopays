import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss'],
})
export class GroupMembersPage implements OnInit {

  id;
  item: AngularFireObject<any>;
  public items: any = {};
  format;
  myGroupMembers = [];
  term = "";
  currentuserId;

  constructor(public route: ActivatedRoute, public router: Router,
    public db: AngularFireDatabase, public navCtrl: NavController, 
    public toastCtrl: ToastController) { 
      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.currentuserId = user.uid
        }
      })
    }

  ngOnInit() {
   this.id = this.route.snapshot.paramMap.get('groupId');
   this.item = this.db.object("/groups/" + this.id);
   this.item.valueChanges().subscribe((data: any) => {
     if (data != null) {
       this.items = data;
       //this.images = data.images;
       this.items["$key"] = this.id;
     }
   })
   let bb = this.myGroupMembers;
   firebase.database().ref('/groups/' + this.id).once('value').then(function (snapshot) {
     let favouritesKey = snapshot.val().members || [];
     console.log(favouritesKey)
     for (let i = 0; i < favouritesKey.length; i++) {
          console.log(favouritesKey[i])
          firebase.database().ref('/users/' + favouritesKey[i]).once('value').then(function (snapshot) {
           let photoURL = (snapshot.val() && snapshot.val().photoURL) || 'There is no name';
           let displayName = (snapshot.val() && snapshot.val().displayName) || 'There is no name';
           let uid = (snapshot.val() && snapshot.val().uid)
           let status = (snapshot.val() && snapshot.val().status)
           bb.push({ "photoURL": photoURL, "displayName": displayName, "uid": uid, "status": status});
          })
          }
     }) 
  }

 

  

goProfile(uid){
  if(uid === this.currentuserId){
    const navData: NavigationExtras = {
      queryParams: {
        from: 'group',
      }
    };
    this.router.navigate(['my-profile'], navData);
  } else {
    this.router.navigate(['/users-details', {
      id: uid
    }])
  }
}



  
}

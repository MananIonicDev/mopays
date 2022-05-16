import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.page.html',
  styleUrls: ['./group-info.page.scss'],
})
export class GroupInfoPage implements OnInit {

  id;
  item: AngularFireObject<any>;
  public items: any = {};
  format;
  myGroupMembers = [];
  term = "";

  constructor(public route: ActivatedRoute, public router: Router,
    public db: AngularFireDatabase, public navCtrl: NavController, 
    public toastCtrl: ToastController) { }

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
  if(uid === firebase.auth().currentUser.uid){
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

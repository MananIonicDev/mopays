import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { ToastController, NavController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.page.html',
  styleUrls: ['./group-create.page.scss'],
})
export class GroupCreatePage implements OnInit {

  
  
  format;
  url;
  alturl = "assets/upload.jpg";
  description;
  name;
  rules;
  groupList: AngularFireList<any>;
  groupDetails: any = {};

  constructor(public dataService: DataService, 
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController, 
    public database: AngularFireDatabase,
    public router: Router, public toastCtrl: ToastController) {
      //this.groupList = database.list("/groups");
   }

  ngOnInit() {
   
} 


   createGroup(){
     this.groupDetails = {
         userId: firebase.auth().currentUser.uid,
         name: this.name,
         description: this.description,
         image: this.url? this.url : this.alturl,
         memberLength: 1,
         rules: this.rules,
         haveIJoined: false,
         members: [firebase.auth().currentUser.uid],
         timeStamp: firebase.database.ServerValue.TIMESTAMP,
        }

      this.database.list("/groups").push(this.groupDetails).then(group => {
        let myId = firebase.auth().currentUser.uid;
        let points: any;
        let groups = [];

        //firebase.database().ref('/users/'  + myId).child('groups').set(group.key),

        this.database.object("/groups/" + group.key).update({
          groupKey: group.key
        }).then(() => {
          firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
            points = (snapshot.val() && snapshot.val().points);
            points = points + 5;
            firebase.database().ref('/users/'  + myId).child('points').set(points);  
         })

         firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
          groups = (snapshot.val() && snapshot.val().groups) || [];
          groups.push(group.key);
          firebase.database().ref('/users/'  + myId).child('groups').set(groups);  
       })
         this.navCtrl.pop();
         this.showToast('Group Created');
      })
   })
  }




/*goSubmit(){
  firebase.database().ref('groups').push({
    userId: firebase.auth().currentUser.uid,
    name: this.name,
    description: this.description,
    image: this.url? this.url : this.alturl,
    memberLength: 1,
    rules: this.rules,
    haveIJoined: false,
    members: [firebase.auth().currentUser.uid],
    timeStamp: firebase.database.ServerValue.TIMESTAMP,

  }).then((success) =>{
    this.navCtrl.pop();
    this.showToast('Group Created');
    let myId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/'  + myId).child('groups').set(updateUserMember);
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/'  + myId).child('points').set(points);  
  })
 })
}*/

async showToast(message) {
  let toast = await this.toastCtrl.create({
    message: message,
    duration: 3000,
  });
  toast.present();
}


fetchCategorys() {
  this.dataService.getGalleyCat().valueChanges().subscribe(res => {
    console.log(res)
  })
}




onSelectFile(event) {
  const file = event.target.files && event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    if(file.type.indexOf('image')> -1){
      this.format = 'image';
    } else if(file.type.indexOf('video')> -1){
      this.format = 'video';
    }
    reader.onload = (event) => {
      this.url = (<FileReader>event.target).result;
    }
  }
}



}

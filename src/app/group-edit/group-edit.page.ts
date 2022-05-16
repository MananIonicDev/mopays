import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.page.html',
  styleUrls: ['./group-edit.page.scss'],
})
export class GroupEditPage implements OnInit {

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
        this.items.image = (<FileReader>event.target).result;
      }
    }
  }

  updateGroup(){
    firebase.database().ref('groups').child(this.id).update({
      name: this.items.name,
      description: this.items.description,
      rules: this.items.rules,
      image: this.items.image
    }).then((success)=>{
      //this.navCtrl.pop();
      this.showToast('Group Edited');
   })
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  

  removeMember(userId, favorId){
    //let myId = firebase.auth().currentUser.uid;
    let members = [];
    let groups = [];
    let updatedMembers = [];
    let updateUserMember = [];
    let memberLength;

        firebase.database().ref('/groups/'  + favorId).once('value').then(function (snapshot) {
        members = (snapshot.val() && snapshot.val().members) || [];
        memberLength = (snapshot.val() && snapshot.val().memberLength);
        members.push(userId);
        for (let i = 0; i < members.length; i++)
        {
            if (members[i] != userId)
            {
                updatedMembers.push(members[i]);
            }
        }

        memberLength = memberLength - 1;

        firebase.database().ref('/groups/'  + favorId).child('members').set(updatedMembers);
        firebase.database().ref('/groups/' + favorId).child('memberLength').set(memberLength);
     });

     firebase.database().ref('/users/'  + userId).once('value').then(function (snapshot) {
      groups = (snapshot.val() && snapshot.val().groups) || [];
      groups.push(favorId);
      for (let i = 0; i < groups.length; i++)
      {
          if (groups[i] != favorId)
          {
            updateUserMember.push(groups[i]);
          }
      }
      firebase.database().ref('/users/'  + userId).child('groups').set(updateUserMember);
   });
   this.showToast('Member removed')
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

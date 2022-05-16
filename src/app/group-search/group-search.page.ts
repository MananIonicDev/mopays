import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { NavController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.page.html',
  styleUrls: ['./group-search.page.scss'],
})
export class GroupSearchPage implements OnInit {

  refPost;
  favourItems = [];
  currentuserId;
  textput = "Join";
  term = '';
  

  constructor(public router: Router, public nav: NavController, 
    public toastCtrl: ToastController, public alertCtrl: AlertController) {

   }

  ngOnInit() {
    this.getFavourite();
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentuserId = user.uid
      }
    })
  
  }

  goBusiness(groupId){
    this.router.navigate(['/group-details', {
      groupId: groupId,
    }])
  }

  editGroup(groupId){
    this.router.navigate(['/group-edit', {
      groupId: groupId
    }])
  }
  
  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  getFavourite(){
    this.refPost = firebase.database().ref('/groups')
    this.refPost.on('value', groupsList =>{
    let groupList = []; 
    groupsList.forEach( group => {
      let members = group.val().members || [];
      let haveIJoined = group.val().haveIJoined;
       for (let i = 0; i < members.length; i++) {
           if (members[i] === this.currentuserId) {
            haveIJoined = true;
            this.textput = "Leave"
           }
       }
    groupList.push({
      groupId: group.key,
      userId: group.val().userId,
      name: group.val().name,
      image: group.val().image,
      members: members,
      memberLength: group.val().memberLength,
      description: group.val().description,
      haveIJoined: haveIJoined,
      timeStamp: group.val().timeStamp
    });  
      this.favourItems = groupList;  
    }); 
  });     
}

groupJoinAlert(id){
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      }  else { 
         this.joinGroup(id)
      }
    })    
}

async presentConfirmLeave(id){
  let alert = await this.alertCtrl.create({
    header: 'Leave Group',
    message: 'Are you sure to leave Group?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Leave',
        handler: () => {
          this.leaveGroup(id)
          this.nav.pop()
        }
      }
    ]
  });
  alert.present();
}


joinGroup(favorId){
  let myId = firebase.auth().currentUser.uid
  let members = [];
  let groups = [];
  let memberLength;
  for (let i = 0; i < this.favourItems.length; i++)
      if (this.favourItems[i].favorId === favorId) {
          console.log("POST FOUND and liked");
          this.favourItems[i].haveIJoined = true;
          this.textput = "Leave"
          this.favourItems[i].memberLength++;
          break;
      }

     firebase.database().ref('/groups/' + favorId).once('value').then(function (snapshot) {
      members = (snapshot.val() && snapshot.val().members) || [];
      memberLength = (snapshot.val() && snapshot.val().memberLength);
      members.push(myId);
      memberLength = memberLength + 1;
      firebase.database().ref('/groups/'  + favorId).child('members').set(members);
      firebase.database().ref('/groups/' + favorId).child('memberLength').set(memberLength);
      });

      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        groups = (snapshot.val() && snapshot.val().groups) || [];
        groups.push(favorId);
        firebase.database().ref('/users/'  + myId).child('groups').set(groups);
        });
        this.showToast('You joined group')
    }

    leaveGroup(favorId){
        let myId = firebase.auth().currentUser.uid;
        let members = [];
        let groups = [];
        let updatedMembers = [];
        let updateUserMember = [];
        let memberLength;
  
  
        for (let i = 0; i < this.favourItems.length; i++)
            if (this.favourItems[i].favorId === favorId) {
                console.log("POST FOUND and unliked");
                this.favourItems[i].haveIJoined = false;
                this.textput = "Join"
                this.favourItems[i].memberLength--;
                break;
            }
  
            firebase.database().ref('/groups/'  + favorId).once('value').then(function (snapshot) {
            members = (snapshot.val() && snapshot.val().members) || [];
            memberLength = (snapshot.val() && snapshot.val().memberLength);
            members.push(myId);
            for (let i = 0; i < members.length; i++)
            {
                if (members[i] != myId)
                {
                    updatedMembers.push(members[i]);
                }
            }

            memberLength = memberLength - 1;

            firebase.database().ref('/groups/'  + favorId).child('members').set(updatedMembers);
            firebase.database().ref('/groups/' + favorId).child('memberLength').set(memberLength);
         });

         firebase.database().ref('/users/'  + myId).once('value').then(function (snapshot) {
          groups = (snapshot.val() && snapshot.val().groups) || [];
          groups.push(favorId);
          for (let i = 0; i < groups.length; i++)
          {
              if (groups[i] != favorId)
              {
                updateUserMember.push(groups[i]);
              }
          }
          firebase.database().ref('/users/'  + myId).child('groups').set(updateUserMember);
       });
       this.showToast('You leave group')

    }
 

}


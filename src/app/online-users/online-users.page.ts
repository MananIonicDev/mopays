import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.page.html',
  styleUrls: ['./online-users.page.scss'],
})
export class OnlineUsersPage implements OnInit {

  public users = [];
  public usersRef = firebase.database().ref('users/').orderByChild('status').equalTo('online');
  
  constructor(public router: Router) { 
    this.usersRef.once('value', contacts => {
      let contactsList = [];
      contacts.forEach(data => {
        contactsList.push({
          email: data.val().email,
          displayName: data.val().displayName,
          photoURL: data.val().photoURL,
          about: data.val().about,
          uid: data.val().uid,
          status: data.val().status,
          dob: data.val().dob,
          gender: data.val().gender,
          nationality: data.val().nationality,
          phoneNumber: data.val().phoneNumber,
        })
      });
       this.users = contactsList;
      console.log(this.users);
    });
  }

  ngOnInit() {
  }

  chatWithUser(displayName, userId) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/message-chat', {
          displayName: displayName,
          userId: userId,
        }])
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  refPost;
  favourItems = [];
  currentuserId;
  from;

  constructor(public router: Router, public route: ActivatedRoute, public nav: NavController) {
    /*firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentuserId = user.uid
      }
    })*/
   }

   setdata(uid: any, name: string, email: string, photo: string){
    firebase.database().ref('users').child(uid).update({
      displayName: name,
      photoURL: photo,
      uid: uid,
      rate: false,
      email: email,
      points: 100,
      gender: '',
      about: '',
      location: '',
      type: 'users',
      block: false,
      IamFollowings: false,
      following: [],
      followingCount: 0,
      followers: [],
      followersCount: 0,
      nationality: '',
      dob: '',
      fcm_token: localStorage.getItem('fcm') ? localStorage.getItem('fcm') : '',
      phoneNumber: '',
      interestfor: '',
      marital: '',
      education: '',
  
    });
    
  }

  ngOnInit() {
    this.getFavourite();
    this.route.queryParams.subscribe(data => {
      console.log(data);
      if (data && data.from) {
        this.from = data.from;
      }
    });
    if(this.from === 'facebook'){
      firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.setdata(user.uid, user.displayName, user.email, user.photoURL)
        }
      })
    }
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentuserId = user.uid
      }
    })
  }

  getClassName() {
    return localStorage.getItem('language');
  }

  goSkip(){
    this.nav.pop()
  }

  goHome(){
    this.router.navigate(['/complete-profile'])
  }

  getFavourite(){
    this.refPost = firebase.database().ref('/favourites')
    this.refPost.on('value', favourList =>{
    let favoursList = []; 
    favourList.forEach( feed => {
      let likes = feed.val().likes || [];
      let haveILiked = feed.val().haveILiked;
       for (let i = 0; i < likes.length; i++) {
           if (likes[i] === firebase.auth().currentUser.uid) {
              haveILiked = true;
           }
       }
    favoursList.push({
      favorId: feed.key,
      name: feed.val().name,
      img: feed.val().img,
      likes: likes,
      haveILiked: haveILiked,
    });  
      this.favourItems = favoursList;  
    }); 
  });     
}

selectFavour(favorId){
  let myId = firebase.auth().currentUser.uid
  let likes = [];
  let favourites = [];
  for (let i = 0; i < this.favourItems.length; i++)
      if (this.favourItems[i].favorId === favorId) {
          console.log("POST FOUND and liked");
          this.favourItems[i].haveILiked = true;
          break;
      }

     firebase.database().ref('/favourites/' + favorId).once('value').then(function (snapshot) {
      likes = (snapshot.val() && snapshot.val().likes) || [];
      likes.push(myId);
      firebase.database().ref('/favourites/'  + favorId).child('likes').set(likes);
      });

      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        favourites = (snapshot.val() && snapshot.val().favourites) || [];
        favourites.push(favorId);
        firebase.database().ref('/users/'  + myId).child('favourites').set(favourites);
        });
    }

    unselectFavour(favorId){
        let myId = firebase.auth().currentUser.uid;
        let likes = [];
        let favourites = [];
        let updatedLikes = [];
        let updateUserLikes = [];
  
  
        for (let i = 0; i < this.favourItems.length; i++)
            if (this.favourItems[i].favorId === favorId) {
                console.log("POST FOUND and unliked");
                this.favourItems[i].haveILiked = false;
                break;
            }
  
            firebase.database().ref('/favourites/'  + favorId).once('value').then(function (snapshot) {
            likes = (snapshot.val() && snapshot.val().likes) || [];
            likes.push(myId);
            for (let i = 0; i < likes.length; i++)
            {
                if (likes[i] != myId)
                {
                    updatedLikes.push(likes[i]);
                }
            }
            firebase.database().ref('/favourites/'  + favorId).child('likes').set(updatedLikes);
         });

         firebase.database().ref('/users/'  + myId).once('value').then(function (snapshot) {
          favourites = (snapshot.val() && snapshot.val().favourites) || [];
          favourites.push(favorId);
          for (let i = 0; i < favourites.length; i++)
          {
              if (favourites[i] != favorId)
              {
                  updateUserLikes.push(favourites[i]);
              }
          }
          firebase.database().ref('/users/'  + myId).child('favourites').set(updateUserLikes);
       });

    }
 

}

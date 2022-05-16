import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage {

  followersItems: Observable<any[]>;
  id: any;
  term = '';
  dummy = Array(10);
  name;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.followersItems = db.list("/users/" + this.id + "/followers/").valueChanges();
  
  }

  goProfile(uid: string){
    this.router.navigate(['/users-details', {
      id: uid,
    }])
    /*firebase.auth().onAuthStateChanged( user => {
      if (user){
        if(uid = user.uid){
          this.router.navigate(['/my-profile'])
        } 
      } else {
        this.router.navigate(['/users-details', {
          id: uid,
        }])
      }
    })*/

  }

 
  /*goProfile(uid: string){
   if(uid === firebase.auth().currentUser.uid){
    this.router.navigate(['/my-profile'])
   } else {
    this.router.navigate(['/users-details', {
      id: uid,
    }])
   }
  }*/
}

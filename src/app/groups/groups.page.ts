import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goSearch(){
    this.router.navigate(['/group-search'])
  }

  goCreateGroup(){
    this.router.navigate(['/group-create'])
  }

  createPost(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
        }  else { 
           this.goCreateGroup()
        }
      })    
  }

}

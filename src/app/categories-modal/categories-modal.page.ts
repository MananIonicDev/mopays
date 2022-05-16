import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.page.html',
  styleUrls: ['./categories-modal.page.scss'],
})
export class CategoriesModalPage implements OnInit {

  public categoryRef: firebase.database.Reference;
  public categoryList = [];

  constructor(public router: Router) { 
    this.categoryRef = firebase.database().ref('feed_categories');
    this.categoryRef.once('value', messages => {
      let catList = [];
      messages.forEach(data => {
        catList.push({
          id: data.key,
          backgroundImage: data.val().image,
          name: data.val().name,
        })
      });
      this.categoryList = catList;
    });
  }

  ngOnInit() {
  }

  goFeed(id: string, name: string){
    this.router.navigate(['/tabs/tab2', {
      id:id,
      name:name
    }])
  }

}

import { Component, OnInit } from '@angular/core';
import { PubCategoryPage } from '../pub-category/pub-category.page';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}

@Component({
  selector: 'app-pub',
  templateUrl: './pub.page.html',
  styleUrls: ['./pub.page.scss'],
})
export class PubPage implements OnInit {

  catPage = PubCategoryPage;
  stories: any[] = [];
  storiesRef;
  dummy = Array(10);

  pubList: any[] = [];
  pubRef;

  constructor(public router: Router) { }

  ngOnInit() {

    this.storiesRef = firebase.database().ref('/pub_category')
    this.storiesRef.on('value', resp => {
      this.stories = [];
      this.stories = snapshotToArray(resp);
      this.dummy = [];
    })

    this.pubRef = firebase.database().ref('/pub_list')
    this.pubRef.on('value', resp => {
      this.pubList = [];
      this.pubList = snapshotToArray(resp);
      this.dummy = [];
    })

  }

  goDetails(key){
    this.router.navigate(['/pub-details', {id: key}])
  }
}

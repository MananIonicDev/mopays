import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
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
  selector: 'app-pub-category',
  templateUrl: './pub-category.page.html',
  styleUrls: ['./pub-category.page.scss'],
})
export class PubCategoryPage implements OnInit {

  id;
  pubList: any[] = [];
  pubRef;
  dummy = Array(10);

  constructor(public navParams: NavParams, public router: Router) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.pubRef = firebase.database().ref('/pub_list').orderByChild('cat').equalTo(this.id)
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

import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as firebase from 'firebase/app';

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
  selector: 'app-jobs-category',
  templateUrl: './jobs-category.page.html',
  styleUrls: ['./jobs-category.page.scss'],
})
export class JobsCategoryPage   {

  id: any;
  public shopItems: Array<any> = [];
  public selectedItems: Array<any> = [];
  shopItem: AngularFireList<any>;
  shops: any = [];
  name;
  searchSelected;
  ref;
  dummy = Array(10);
  term = '';

  constructor(
    public database: AngularFireDatabase, public router: Router, 
    public route: ActivatedRoute, 
    public loadingCtrl: LoadingController, 
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.ref = firebase.database().ref('jobs').orderByChild('category').equalTo(this.id)
    this.ref.on('value', resp => {
      this.shops = [];
      this.shops = snapshotToArray(resp);
      this.dummy = [];
      //this.userList = this.selectedItems;
    })

  }

 
 
  goToPostDetails(id){
    this.router.navigate(['/jobs-details', {
      id: id,
    }])
  }

  initializeItems() {
    this.shops = this.searchSelected
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.shops = this.shops.filter(data => {
        return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || data.jobId.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
 
}


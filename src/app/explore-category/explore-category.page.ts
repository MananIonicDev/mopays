import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthsProvider } from '../services/auth';
import { DataService } from '../services/data';


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
  selector: 'app-explore-category',
  templateUrl: './explore-category.page.html',
  styleUrls: ['./explore-category.page.scss'],
})
export class ExploreCategoryPage implements OnInit  {

 
  dummyExplore = Array(10); 
  exploreList = [];
  key='';
  term = '';
  name;
  id;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public dataService: DataService, 
    public authService: AuthsProvider, 
    
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
   }

   goDetails(id){
    this.router.navigate(['/explore-details', {
      id: id,
    }])
  }
 
 ngOnInit(){
  firebase.database().ref('explore_sample/').orderByChild('category').equalTo(this.id).on('value', resp => {
    this.exploreList = [];
    this.exploreList = snapshotToArray(resp);
    this.dummyExplore = [];
  })
 }

 
  
}
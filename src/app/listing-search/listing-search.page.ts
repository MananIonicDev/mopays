import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
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
  selector: 'app-listing-search',
  templateUrl: './listing-search.page.html',
  styleUrls: ['./listing-search.page.scss'],
})
export class ListingSearchPage   {

id;
name;
img;
public shopItems: Array<any> = [];
public selectedItems: Array<any> = [];
shopItem: AngularFireList<any>;
shops: any = [];
term = '';
sorting: any;
ref;
dummy = Array(10);

  constructor(public router: Router, public route: ActivatedRoute, 
    public database: AngularFireDatabase, public loadingCtrl: LoadingController) { 
    //this.id = this.route.snapshot.paramMap.get('id');
    //this.name = this.route.snapshot.paramMap.get('name');
    //this.img = this.route.snapshot.paramMap.get('img');
    this.sorting = "7";
    this.ref = firebase.database().ref('items_sell')
    this.ref.on('value', resp => {
      this.shops = [];
      this.shops = snapshotToArray(resp);
      this.dummy = [];
      //this.userList = this.selectedItems;
    })

  }

  goDetails(id){
    this.router.navigate(['/listing-details', {
      id:id
    }])
  }
 
  sort(){

    if(this.sorting === "1"){
    this.shops.sort(function(a, b){
    
      
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    });
    }
    else if(this.sorting === "2"){
    
    this.shops.sort(function(a, b){
    
      
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA > nameB) //sort string ascending
            return -1 
        if (nameA < nameB)
            return 1
        return 0 //default return value (no sorting)
    });
    
    }else if(this.sorting === "3"){
    
    
    this.shops.sort(function(a, b){
    
      
        var nameA=a.price, nameB=b.price
        //return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        return nameA - nameB;
    
    });
    }else if(this.sorting === "4"){
    
    this.shops.sort(function(a, b){
    
      
        var nameA=a.price, nameB=b.price
        //return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        return nameB - nameA;
     
    });
    }else if(this.sorting === "5"){
    
    this.shops.sort(function(a, b){
    
        var nameA=a.timeStamp, nameB=b.timeStamp
        //return new Date(nameB.start).getTime() - new Date(nameA.start).getTime()
      return nameB - nameA;
    });
    }else if(this.sorting === "6"){
    
    this.shops.sort(function(a, b){
    
        var nameA=a.timeStamp, nameB=b.timeStamp
         return nameA - nameB;
     
    });
    }else{
    
    return 0
    }
    console.log(this.shops.length);
    }

}

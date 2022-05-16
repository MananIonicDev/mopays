import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data';
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
  selector: 'app-jobs-all',
  templateUrl: './jobs-all.page.html',
  styleUrls: ['./jobs-all.page.scss'],
})
export class JobsAllPage implements OnInit {

pic = 'assets/imgs/profile.jpg'
slideOpts = {
  autoplay: {
    delay: 2000,
  },
  zoom: false,
  effect: 'flip'
};

ref;
dummy = Array(10);
term = '';

ItemsList = []
lottieConfig: any;
public selectedItems: Array<any> = [];
sorting;

  constructor(public router: Router, public dataService: DataService) { 
     
    this.sorting = "7";
    this.ref = firebase.database().ref('jobs')
    this.ref.on('value', resp => {
      this.ItemsList = [];
      this.ItemsList = snapshotToArray(resp);
      this.dummy = [];
      //this.userList = this.selectedItems;
    })


  }

  ngOnInit() {
    
  }

  fetchItems(){
    this.dataService.getJobList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  goToPostDetails(id){
    this.router.navigate(['/jobs-details', {
      id: id,
    }])
  }

  initializeItems() {
    this.ItemsList = this.selectedItems;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.ItemsList = this.ItemsList.filter(data => {
        return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || data.jobId.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }


  sort(){

    if(this.sorting === "1"){
    this.ItemsList.sort(function(a, b){
    
      
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    });
    }
    else if(this.sorting === "2"){
    
    this.ItemsList.sort(function(a, b){
    
      
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA > nameB) //sort string ascending
            return -1 
        if (nameA < nameB)
            return 1
        return 0 //default return value (no sorting)
    });
    
    }else if(this.sorting === "3"){
    
    
    this.ItemsList.sort(function(a, b){
    
      
        var nameA=a.price, nameB=b.price
        //return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        return nameA - nameB;
    
    });
    }else if(this.sorting === "4"){
    
    this.ItemsList.sort(function(a, b){
    
      
        var nameA=a.price, nameB=b.price
        //return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        return nameB - nameA;
     
    });
    }else if(this.sorting === "5"){
    
    this.ItemsList.sort(function(a, b){
    
        var nameA=a.timeStamp, nameB=b.timeStamp
        //return new Date(nameB.start).getTime() - new Date(nameA.start).getTime()
      return nameB - nameA;
    });
    }else if(this.sorting === "6"){
    
    this.ItemsList.sort(function(a, b){
    
        var nameA=a.timeStamp, nameB=b.timeStamp
         return nameA - nameB;
     
    });
    }else{
    
    return 0
    }
    console.log(this.ItemsList.length);
    }


}






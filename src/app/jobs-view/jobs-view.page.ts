import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { JobCategorys } from '../services/job_category';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

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
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.page.html',
  styleUrls: ['./jobs-view.page.scss'],
})
export class JobsViewPage implements OnInit {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  
  public advertRef = firebase.database().ref('Adverts/')
  adverts = []
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };


  image = "assets/imgs/background/24.jpg";
  jobCategories = [];
  dummy = Array(8);
  ref;
  ItemsList = []
  selectedItems = [];
  searchitem;

  constructor(public dataService: DataService, public router: Router, public theInAppBrowser: InAppBrowser) { 
    this.ref = firebase.database().ref('jobs')
    this.ref.on('value', resp => {
      this.ItemsList = [];
      this.ItemsList = snapshotToArray(resp);
      this.dummy = [];
      this.selectedItems = this.ItemsList;
      //this.userList = this.selectedItems;
      console.log('items', this.ItemsList)
    })
  }

  async ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getJobCatList();
    catRes.snapshotChanges().subscribe(res => {
      this.jobCategories = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.jobCategories.push(a as JobCategorys);
      })
    })
    
    this.advertRef.orderByChild('type').equalTo('jobs').once('value', adverts => {
      let advertsList = [];
      adverts.forEach(data => {
        advertsList.push({
          id: data.key,
          image: data.val().image,
          type: data.val().type,
          name: data.val().name,
          url: data.val().url,
          description: data.val().description
        })
      });
       this.adverts = advertsList
    })
      //console.log(this.contacts);
  }

  initializeItems() {
    this.ItemsList = this.selectedItems;
  }

  searchName(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.ItemsList = this.ItemsList.filter(data => {
        return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  searchLocation(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      if (this.searchitem != null) {
        this.ItemsList = this.ItemsList.filter(data => {
          return data.location.toLowerCase().indexOf(val.toLowerCase()) > -1 && data.name.toLowerCase().indexOf(this.searchitem.toLowerCase()) > -1;
        });
      }
      else {
        this.ItemsList = this.ItemsList.filter(data => {
          return data.location.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      }
    }
  }

  goAdsDetails(url){
    //window.open(url, '_blank')
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

fetchCategorys() {
  this.dataService.getJobCatList().valueChanges().subscribe(res => {
    console.log(res)
  })
}

goSearch(){
  this.router.navigate(['/jobs-all'])
}

goToPostDetails(id){
  this.router.navigate(['/jobs-details', {
    id: id,
  }])
}


addJob(){
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.dataService.setRoot('/jobs-add');
        this.router.navigate(['/login'])
      }  else { 
        this.router.navigate(['/jobs-add'])
      }
    })  
}

goJobCat(id, name){
  this.router.navigate(['/jobs-category', {
    id:id,
    name: name,
  }])
}




}


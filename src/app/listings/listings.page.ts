import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Categorys } from '../services/listing-cat';
import { DataService } from '../services/data';
import * as firebase from 'firebase/app';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) inifiniteScroll: IonInfiniteScroll;
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  pic = 'assets/imgs/profile.jpg'
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  dummy = Array(8);
  CategoriesList = []
  selectedItems = [];
  searchitem;
  ItemsList = []
  adverts = [];
  lottieConfig: any;
  public advertRef = firebase.database().ref('Adverts/');
  public lastKey: string = '';
  public isFinished = false;

  constructor(public router: Router, public dataService: DataService, public theInAppBrowser: InAppBrowser) {

  }

  getAllItemsList() {
    firebase.database().ref('items_sell/').orderByKey().limitToFirst(10).on("value", snap => {
      snap.forEach(child => {
        let item = child.val();
        item.key = child.key;
        this.lastKey = child.key;
        this.ItemsList.push(item);
      })
      this.dummy = [];
      this.selectedItems = this.ItemsList;
    })

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

  doInfinite(event: any) {
    firebase.database().ref('items_sell').orderByKey().startAt(this.lastKey).limitToFirst(5).on("value", snap => {
      event.target.complete();
      if (snap.numChildren() == 1) {
        this.inifiniteScroll.disabled = true;
        this.isFinished = true;
      } else {
        snap.forEach(child => {
          if (this.lastKey != child.key) {
            let item = child.val();
            item.key = child.key;
            this.lastKey = child.key;
            this.ItemsList.push(item);
          }
        })
      }
    })
  }

  async ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getCategoryList();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as Categorys);
      })
    })
    this.getAllItemsList()
    /*this.fetchItems();
    let itemRes = this.dataService.getSaleItemList();
    itemRes.snapshotChanges().subscribe(res => {
      this.ItemsList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.ItemsList.push(a as Items);
      })
    })*/

    this.advertRef.orderByChild('type').equalTo('class').once('value', adverts => {
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

  goAdsDetails(url) {
    //window.open(url, '_blank')
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  /*fetchItems(){
    this.dataService.getSaleItemList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }*/


  fetchCategorys() {
    this.dataService.getCategoryList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }


  goSearch() {
    this.router.navigate(['/listing-search'])
  }

  goSubCat(id, name) {
    this.router.navigate(['/listing-subcat', {
      id: id,
      name: name
    }])
  }

  showModal() {
    this.router.navigate(['/listing-search'])
  }

  goDetails(id) {
    this.router.navigate(['/listing-details', {
      id: id
    }])
  }

  goSell() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.dataService.setRoot('/listing-sell');
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/listing-sell'])
      }
    })

  }



}



/*hash_config {
  algorithm: SCRYPT,
  base64_signer_key: SXXh+aC+wzO8A5VZzZaSDsgta7IiInSQGJt6d8EFeQronAtXSi97DmscYc3qIKhRCoQNj4Ig0W+0Qc0ZCSuDkw==,
  base64_salt_separator: Bw==,
  rounds: 8,
  mem_cost: 14,
}*/


//firebase auth:export C:\Users\Ashekun\manish-mopays\myauth.json --project mopaysapp-6166e // projectId & create myauth.json manually

//firebase auth:import C:\Users\Ashekun\manish-mopays\myauth.json --hash-algo=scrypt --rounds=8 --mem-cost=14 --hash-key=SXXh+aC+wzO8A5VZzZaSDsgta7IiInSQGJt6d8EFeQronAtXSi97DmscYc3qIKhRCoQNj4Ig0W+0Qc0ZCSuDkw== --salt-separator=Bw== --project=mopaysapp-6166e
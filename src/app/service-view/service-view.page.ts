import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { ServiceCategorys } from '../services/service_provider';
import { ServiceLists } from '../services/service-list';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.page.html',
  styleUrls: ['./service-view.page.scss'],
})
export class ServiceViewPage implements OnInit {

  pic = 'assets/imgs/profile.jpg'

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

  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };


  public advertRef = firebase.database().ref('Adverts/')
  adverts = []
  CategoriesList = []
  selectedItems = [];
  ItemsList = []
  lottieConfig: any;
  serviceCreated;
  serviceId;
  listOrder: string = 'reverse';
  dummy = Array(8)

  constructor(public router: Router, public dataService: DataService, public theInAppBrowser: InAppBrowser,
    public authService: AuthsProvider) {


  }

  async ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getServiceCat();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as ServiceCategorys);
      })
    })
    this.loadShopId()
    this.fetchItems();

    let itemRes = this.dataService.getServiceList();
    itemRes.snapshotChanges().subscribe(res => {
      this.ItemsList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.ItemsList.push(a as ServiceLists);
      })
      this.selectedItems = this.ItemsList;
    })
    this.advertRef.orderByChild('type').equalTo('service').once('value', adverts => {
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


  goAdsDetails(url) {
    //window.open(url, '_blank')
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }

  loadShopId() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authService.getuserdetails(user.uid).then((res: any) => {
          this.serviceCreated = res.serviceCreated; //'active',
          this.serviceId = res.serviceId
        })
      }
    })
  }

  goBookingCat(id, name) {
    this.router.navigate(['/service-category', {
      id: id,
      name: name
    }])
  }


  goMyBooking() {
    this.router.navigate(['/service-my', {
      id: this.serviceId
    }])

  }

  changeOrder(){
    if (this.listOrder === 'reverse'){
      this.listOrder = 'oldest';
    }
    else {
      this.listOrder = 'reverse';
    }
  }

  goBooking() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.dataService.setRoot('/service-add');
        this.router.navigate(['/auth'])
      } else if (this.serviceCreated == 'active') {
        this.router.navigate(['/service-my', {
          id: this.serviceId
        }])
      } else {
        this.router.navigate(['/service-add'])
      }
    })

  }

  fetchItems() {
    this.dataService.getServiceList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }


  fetchCategorys() {
    this.dataService.getServiceCat().valueChanges().subscribe(res => {
      console.log(res)
    })
  }



  goDetails(id) {
    this.router.navigate(['/service-details', {
      id: id
    }])
  }



}



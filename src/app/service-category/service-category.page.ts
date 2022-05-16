import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import * as firebase from 'firebase';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.page.html',
  styleUrls: ['./service-category.page.scss'],
})

export class ServiceCategoryPage implements OnInit {

id;
name;
img;
public shopItems: Array<any> = [];
public selectedItems: Array<any> = [];
shopItem: AngularFireList<any>;

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

shops: any = [];
adverts = [];
slideOpts = {
  autoplay: true,
  zoom: false,
  effect: 'flip'
};
public advertRef = firebase.database().ref('Adverts/');

  constructor(public router: Router, public route: ActivatedRoute, public theInAppBrowser: InAppBrowser,
    public database: AngularFireDatabase, public loadingCtrl: LoadingController) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.advertRef.orderByChild('type').equalTo('servicecat').once('value', adverts => {
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
      //console.log(this.contacts);
    });
  }

  goAdsDetails(url){
    //window.open(url, '_blank')
    let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
  }

  async ngOnInit() {
   
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present().then(() => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.name = this.route.snapshot.paramMap.get('name');
      this.shopItem = this.database.list("/service_provider");
      let subscription = this.shopItem
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((res: any) => {
          this.shopItems = res;
          console.log(res)
          for (var i = 0; i <= this.shopItems.length - 1; i++) {
            if (this.shopItems[i].category == this.id) {
              this.selectedItems.push(this.shopItems[i]);
              this.shops = this.selectedItems;
               }
             }
          })
           loader.dismiss();
        });
     }

     presentAlert(id){
    this.router.navigate(['/service-details', {
      id:id
    }])
  }
 
  

}


import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../services/event';
import { DataService } from '../services/data';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import * as firebase from 'firebase/app';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

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

searchitem;

eventList = []
selectedItems = []
dummyEvent = Array(10);
public lastKey: string = '';
  public isFinished = false;
  @ViewChild(IonInfiniteScroll, { static: false }) inifiniteScroll: IonInfiniteScroll;


  constructor(public router: Router, public dataService: DataService, public theInAppBrowser: InAppBrowser) { 
    
  }

  getEventList(){
    firebase.database().ref('events/').orderByKey().limitToFirst(5).on("value", snap => {
      snap.forEach(child => {
        let item = child.val();
        item.key = child.key;
        this.lastKey = child.key;
        this.eventList.push(item);
      })
      this.dummyEvent = [];
      this.selectedItems = this.eventList;
    })
  
  }

  initializeItems() {
    this.eventList = this.selectedItems;
  }

  searchName(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.eventList = this.eventList.filter(data => {
        return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  searchLocation(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      if (this.searchitem != null) {
        this.eventList = this.eventList.filter(data => {
          return data.venue.toLowerCase().indexOf(val.toLowerCase()) > -1 && data.name.toLowerCase().indexOf(this.searchitem.toLowerCase()) > -1;
        });
      }
      else {
        this.eventList = this.eventList.filter(data => {
          return data.venue.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      }
    }
  }
  
  doInfinite(event: any){
    firebase.database().ref('events').orderByKey().startAt(this.lastKey).limitToFirst(5).on("value", snap => {
      event.target.complete();
      if(snap.numChildren() == 1){
        this.inifiniteScroll.disabled = true;
        this.isFinished = true;
      } else {
        snap.forEach(child => {
          if(this.lastKey != child.key){
            let item = child.val();
            item.key = child.key;
            this.lastKey = child.key;
            this.eventList.push(item);
          }
        })
      }
    })
  }

  async ngOnInit() {
      /*let itemRes = this.dataService.getEventList();
      itemRes.snapshotChanges().subscribe(res => {
        this.eventList = [];
        res.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.eventList.push(a as Event);
          this.dummyEvent = [];
        })
      })*/
      this.getEventList()
      this.advertRef.orderByChild('type').equalTo('events').once('value', adverts => {
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
  
  
    goAdsDetails(url){
      //window.open(url, '_blank')
      let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
    }

  
  onItemEvent(id){
    this.router.navigate(['/event-details', {
      id:id
    }])
  }

  goAddEvent(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.dataService.setRoot('/event-add');
          this.router.navigate(['/login'])
        }  else { 
          this.router.navigate(['/event-add'])
        }
      })  
  }
 

}




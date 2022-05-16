import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
//import { CategoryFilterPage } from '../category-filter/category-filter.page';
import { ApiService } from '../services/article';
import * as firebase from 'firebase/app';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-latest',
  templateUrl: './latest.page.html',
  styleUrls: ['./latest.page.scss'],
})
export class LatestPage implements OnInit {

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

  page = 1;
  posts = [];
  totalPages = 0;
  totalPosts = 0;
  public advertRef = firebase.database().ref('Adverts/')
  adverts = [];
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };
  categoryFilter = null;
  searchTerm = '';

  constructor(
    private api: ApiService,
    private loadingCtrl: LoadingController,
    public theInAppBrowser: InAppBrowser,
    public router: Router,
    private popoverCtrl: PopoverController
  ) {
    this.advertRef.orderByChild('type').equalTo('news').once('value', adverts => {
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
  }

  ngOnInit() {
    this.loadPosts();
  }

  goAdsDetails(url){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

  async goToPostDetails(post){
    this.router.navigate(['/news-details', {postId: post.id}])
  }



  async loadPosts(infiniteScroll = null) {
    let loading = null;
    if (!infiniteScroll) {
      /*loading = await this.loadingCtrl.create({
        message: 'Loading News...'
      });
      await loading.present();*/
    }

    this.api.getPosts(this.page, this.categoryFilter).subscribe(
      res => {
        console.log('res: ', res);
        if (infiniteScroll) {
          infiniteScroll.target.complete();
          this.posts = [...this.posts, ...res.posts];
          if (this.page == this.totalPages) {
            infiniteScroll.target.disabled = true;
          }
        } else {
          this.posts = res.posts;
        }

        this.totalPages = res.pages;
        this.totalPosts = res.totalPosts;
      },
      err => {
        console.log('error: ', err);
      },
      () => {
        if (!infiniteScroll) {
          //loading.dismiss();
          console.log('Load dismiss')
        }
      }
    );
  }

  loadMore(event) {
    this.page++;
    this.loadPosts(event);
  }

  /*async openFilter(ev) {
    const popover = await this.popoverCtrl.create({
      component: CategoryFilterPage,
      event: ev,
      translucent: true,
      componentProps: {
        selected: this.categoryFilter
      }
    });

    popover.onDidDismiss().then(res => {
      console.log('after popover: ', res);
      if (res && res.data) {
        this.categoryFilter = res.data.id;
        this.loadPosts();
      }
    })

    await popover.present();
  }*/

  searchChanged() {
    //this.page = 0;
    this.loadPosts();
  }


}
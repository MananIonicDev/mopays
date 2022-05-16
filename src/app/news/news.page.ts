import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import * as firebase from 'firebase/app';
import { NewsService } from '../services/news';
import { WordpressService } from '../services/api';
import { NewsCategoryPage } from '../news-category/news-category.page';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  public blog: string;
  url: string = 'https://mopays.com/'
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
  items: any = []
  //page: any = 1;
  public advertRef = firebase.database().ref('Adverts/')
  adverts = [];
  slideOpts = {
    autoplay: true,
    zoom: false,
    effect: 'flip'
  };

  newsCategoryList: any;
  posts = [];
  page = 1;
  count = null;
  newsDetailsPage = NewsCategoryPage;
  
  constructor(
      private activatedRoute: ActivatedRoute,
      public http: HttpClient,
      public Router: Router,
      public postService: NewsService,
      public toastCtrl: ToastController,
      public theInAppBrowser: InAppBrowser,
      public loadingController: LoadingController,
      public wp: WordpressService,
      public navCtrl: NavController
    ) {
      //this.loadPost(this.url, this.page, true);
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
      this.loadPosts()
    }

    loadPosts() {
     /* let loading = await this.loadingController.create({
        message: 'Loading News...'
      });
      await loading.present();*/
   
      this.wp.getPosts().subscribe(res => {
        this.count = this.wp.totalPosts;
        this.posts = res;
        //loading.dismiss();
      });
    }
   
    loadMores(event) {
      this.page++;
   
      this.wp.getPosts(this.page).subscribe(res => {
        this.posts = [...this.posts, ...res];
        event.target.complete();
   
        // Disable infinite loading when maximum reached
        if (this.page == this.wp.pages) {
          event.target.disabled = true;
        }
      });
    }

    /*async loadPost(url: string, page, showLoading) {
      const loading = await this.loadingController.create({
        message: 'Please wait'
      });
      if (showLoading) {
        await loading.present();
    }

    const route = this.url + 'wp-json/wp/v2/posts'
    // set pagination
    if (!page) {
      page = '1';
    }

    return new Promise((resolve, reject) => {

      var concat;

      // check if url already has a query param
      if (url.indexOf('?') > 0) {
        concat = '&';
      } else {
        concat = '?';
      }

      this.http.get(route + concat + 'page=' + page)
        .subscribe(data => {

          if (showLoading) {
            loading.dismiss();
          }
          console.log(this.items);
          this.items = this.items.concat(data);
          resolve(this.items);
        },
          error => {
            if (showLoading) {
              loading.dismiss();
            }
            reject(error);
            this.presentToast(error.error.message)
          })
    });
  }
  doRefresh(event) {
    this.loadPost(this.url, 1, false).then(() => {
      event.target.complete()
    }).catch(() => {
      event.target.complete()
    });
  }

  loadMore(event) {
    this.page++;
    
    this.loadPost(this.url, this.page, false).then(() => {
     
      event.target.complete()
    }).catch(() => {
      event.target.complete()
    });

  }*/

  async presentToast(msg) {

    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      cssClass: 'normal-toast'
    });

    toast.present();

  }


  goNews(id, name){
    this.Router.navigate(['/news-category', {
      id:id,
      name: name
    }])
  }

  async goToPostDetails(post){
    this.Router.navigate(['/news-details', {postId: post.id}])
  }


  /*goToPostDetails(post){
    //alert(post);
    let navigationExtras: any = {
      queryParams: {
        special: JSON.stringify(post)
      }
    };
    //console.log(navigationExtras);
   this.Router.navigate(['my-interest'], navigationExtras);
  }*/
  
  ngOnInit() {
    this.postService.getNewsCat().subscribe(data =>{
      console.log(data);
      this.newsCategoryList = data;
    });
  }

  goAdsDetails(url){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

}

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news';
import { Router } from '@angular/router';
import { ToastController, ModalController, NavParams, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { ApiService } from '../services/article';


@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.page.html',
  styleUrls: ['./news-category.page.scss'],
})
export class NewsCategoryPage implements OnInit {

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

  public items:any=[];
  private per_page:number = 5;
  //private page:number = 1;
  private isLoading:boolean = false;
  id: any;
  categories: any;
  lottieConfig: any;
  name;
  public advertRef = firebase.database().ref('Adverts/')
  adverts = [];

  page = 1;
  posts = [];
  totalPages = 0;
  totalPosts = 0;
  
  

  constructor( public postService: NewsService, public modalCtrl: ModalController,
    public toastController: ToastController, public theInAppBrowser: InAppBrowser,
    public Router: Router, public navParam: NavParams, private api: ApiService, public loadingCtrl: LoadingController) {
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

  goAdsDetails(url){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }

  ngOnInit(){
    this.id = this.navParam.get('id');
    console.log(this.id)
    //this.getPosts(); 
    this.loadPosts();
  }

 
  async loadPosts(infiniteScroll = null) {
    /*let loading = null;*/
    if (!infiniteScroll) {
      console.log('Ready loading')
      /*loading = await this.loadingCtrl.create({
        message: 'Loading Data...'
      });
      await loading.present();*/
    }

    this.api.getPosts(this.page, this.id).subscribe(
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
          console.log('finish loading')
          //loading.dismiss();
        }
      }
    );
  }

  loadMore(event) {
    this.page++;
    this.loadPosts(event);
  }

  
  async goToPostDetails(post){
    this.Router.navigate(['/news-details', {postId: post.id}])
  }


getPosts(infinityScroll = null){
  this.postService.get('posts?_embed&per_page=' + this.per_page + '&page=1');
  if(!this.isLoading){
    this.isLoading = true;
    if(infinityScroll != null && infinityScroll.ionRefresh){
      this.page = 1;
    }

    let url:string = 'posts?_embed&per_page=' + this.per_page + '&page=' + this.page;
    url += this.id != 0 ?'&categories=' + this.id:'';

    this.postService.get(url).subscribe((dat:any) => {
      
      this.isLoading = false;
      if(infinityScroll != null && infinityScroll.ionRefresh){
        setTimeout(_ => this.items = this.items.concat(dat.items), 10000);
        this.items = this.items; 
      }
      
      this.items = infinityScroll != null && infinityScroll.ionRefresh ? dat: this.items.concat(dat);
      
      console.log(dat);
      if(dat.length === this.per_page){
        this.page++;
      }

      if(infinityScroll!=null){
        infinityScroll.target.complete();
      }
    }, (error)=>{
      this.isLoading = false;
      if(infinityScroll!=null){
        infinityScroll.target.complete();
      }
    });
  }
}



async presentToast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}




  

}

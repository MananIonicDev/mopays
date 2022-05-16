import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NewsService } from '../services/news';
import { ToastController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ApiService } from '../services/article';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {
  data;
  input;
  url: string = 'https://mopays.com/';
  lottieConfig: any;
  favorites = [];
  id: any;
  photoURL;
  displayName;
  currentUserId;
  message;
  newsComment = [];
  post = null;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService,
    public authService: AuthsProvider, public socialSharing: SocialSharing, public modalCtrl: ModalController,
    public http: HttpClient, public storeNewsService: NewsService, public toastController: ToastController) {
   
    this.id = this.route.snapshot.paramMap.get('postId');
   /* this.getPostDetails(this.id).subscribe(res => {
      this.data = res;
    });*/
  }

  getPostDetails(id) {
    const route = this.url + 'wp-json/wp/v2/' + `posts/${id}?_embed`
    return this.http.get(route).pipe(
      map(post => {
        post['media_url'] = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        console.log(post);
        return post;
      })
    )
  }

  closeApp(){
   this.modalCtrl.dismiss()
  }

  sendComment(){
    firebase.database().ref('news_comment').push({
      newsId: this.id,
      message: this.message,
      date: firebase.database.ServerValue.TIMESTAMP,
      photoURL: this.photoURL,
      displayName: this.displayName,
    })
    this.message = ''
  }

  getComment(){
    firebase.database().ref('news_comment').orderByChild('newsId').equalTo(this.id).on('value', snapshot =>{
  		this.newsComment = [];
  		snapshot.forEach( snap =>{
  			this.newsComment.push({
          newsId: snap.val().newsId,
  			  id: snap.key,
	        message: snap.val().message,
	        displayName: snap.val().displayName,
	        photoURL: snap.val().photoURL,
	        date: snap.val().date
  			});
  		});
  	});
  }

  goLogin(){
    this.router.navigate(['/login'])
  }

  shareSheetShare() {
    this.socialSharing.share(this.post.title.rendered, 'Mopays News', null, this.post.link).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  ngOnInit() {
    this.getComment()
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
        this.loaduserdetails(user.uid);
      } 
    })
    this.id = this.route.snapshot.paramMap.get('postId');
    this.api.getPostContent(this.id).subscribe(res => {
      console.log('post: ', res);
      this.post = res;
    });
  }

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
    }) 
}

  send(){}

  opensource(link){
    window.open(link);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  

  /*getFavorites() {
    const favStorage = localStorage.getItem('favorites');
    if (favStorage) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
  }*/

  /*onClickFavorite(data) {
        //data = this.data
    if (_.find(this.favorites, { id: data.id })) {
      _.remove(this.favorites, (fav) => {
        this.presentToast('News Remove')
        return fav.id === data.id;
      });
    } else {
      //quote.category = this.category;

      this.favorites.push(data);
      this.presentToast('News Bookmarked')
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(data) {
     //data = this.data
    if (_.find(this.favorites, { id: data.id })) {
      return true;
    }
    return false;
  }*/

  ionViewWillEnter() {
    //this.getFavorites();
  }

}

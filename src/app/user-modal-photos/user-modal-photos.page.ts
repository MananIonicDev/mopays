import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
 
@Component({
  selector: 'app-user-modal-photos',
  templateUrl: './user-modal-photos.page.html',
  styleUrls: ['./user-modal-photos.page.scss'],
})
export class UserModalPhotosPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  img: any;
 
  sliderOpts = {
    zoom: true
  };

  id: any;
  images = [];
  name;
  date;
  photo;
  userId;
  refPostPhoto;
  feedPhoto = [];
  description;
  pic = 'assets/radio/best.png';

  constructor(private modalController: ModalController, 
    public navParam: NavParams, public socialSharing: SocialSharing) { 
    this.img = this.navParam.get('img')
    this.id = this.navParam.get('id')
    this.name = this.navParam.get('name')
    this.date = this.navParam.get('date')
    this.photo = this.navParam.get('photo')
    this.userId = this.navParam.get('userId')
    this.description = this.navParam.get('description')
    this.getPhotoGallery(this.userId)
  }

  getPhotoGallery(userId){
    let myId = firebase.auth().currentUser.uid;
    this.refPostPhoto = firebase.database().ref('/photo_list').orderByChild('userId').equalTo(userId)
    this.refPostPhoto.on('value', feedList =>{
    let feeds = []; 
    feedList.forEach( feed => {
      let item = feed.val();
      item.key = feed.key;
      item.likes = feed.val().likes || [];
      //item.Date = child.val().Date;
      item.haveILiked = feed.val().haveILiked;
      item.userId = feed.val().userId;
      for (let i = 0; i < item.likes.length; i++) {
        if (item.likes[i] === myId) {
           item.haveILiked = true;
        }
        firebase.database().ref('users/' + item.userId).once('value', (snapshot) => {
          item.Name = snapshot.val().displayName;
          item.Photo = snapshot.val().photoURL;
      });
    }
    feeds.push(item);  
      this.feedPhoto = feeds;  
      //this.dummyBook = [];
    }); 
   });
 // });     
}

 
  ngOnInit() {
    this.id = this.navParam.get('id')
    firebase.database().ref("/service_provider/" + this.id + '/product/').on('value', snapshot =>{
  		this.images = [];
  		snapshot.forEach( snap =>{
  			this.images.push({
  			  id: snap.key,
	        image: snap.val().image,
  			});
  		});
    });
   }
 
  ionViewDidEnter(){
    this.slides.update();
  }
 
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }
 
  close() {
    this.modalController.dismiss();
  }

  
  shareSheetShares(){
    this.socialSharing.share(null, "MopaysApp", this.img, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  shareSheetShare(img) {
    this.socialSharing.share(null, "MopaysApp", img, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

 
 
 
}
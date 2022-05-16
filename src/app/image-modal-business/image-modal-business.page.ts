import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
 
@Component({
  selector: 'app-image-modal-business',
  templateUrl: './image-modal-business.page.html',
  styleUrls: ['./image-modal-business.page.scss'],
})
export class ImageModalBusinessPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  img: any;
 
  sliderOpts = {
    zoom: true
  };
  id: any;
  images = [];
 
  constructor(private modalController: ModalController, public navParam: NavParams, public socialSharing: SocialSharing) { 
    this.img = this.navParam.get('img')
    this.id = this.navParam.get('id')
  }
 
  ngOnInit() {
    this.id = this.navParam.get('id')
    firebase.database().ref("/booking_shop/" + this.id + '/product/').on('value', snapshot =>{
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
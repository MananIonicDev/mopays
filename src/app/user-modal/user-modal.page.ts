import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
 
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.page.html',
  styleUrls: ['./user-modal.page.scss'],
})
export class UserModalPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  img: any;
 
  sliderOpts = {
    zoom: true
  };

  id: any;
  images = [];
 
  constructor(private modalController: ModalController, 
    public navParam: NavParams, public socialSharing: SocialSharing) { 
    this.img = this.navParam.get('img')
    
  }
 
  ngOnInit() {
    this.img = this.navParam.get('img')
    
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

 
 
}
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonNav, IonSlides, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-feed-modal',
  templateUrl: './feed-modal.page.html',
  styleUrls: ['./feed-modal.page.scss'],
})
export class FeedModalPage implements OnInit {

  id: any;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  @ViewChild(IonSlides) slides: IonSlides;
  img: any;
 
  sliderOpts = {
    zoom: true
  };

  constructor(public navParam: NavParams,public photoViewer: PhotoViewer,
    public db: AngularFireDatabase, public modalCtrl: ModalController, public socialSharing: SocialSharing) { }

  ngOnInit() {
    this.id = this.navParam.get('id');
    this.img = this.navParam.get('img');
    this.item = this.db.object("/feeds/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.images = data.images;
        this.items["$key"] = this.id;
      }
    })
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
    this.modalCtrl.dismiss();
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
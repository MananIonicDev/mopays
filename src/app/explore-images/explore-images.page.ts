import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { NavigationExtras, Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonNav, IonSlides, ModalController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-explore-images',
  templateUrl: './explore-images.page.html',
  styleUrls: ['./explore-images.page.scss'],
})
export class ExploreImagesPage implements OnInit {

  id: any;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  @ViewChild(IonSlides) slides: IonSlides;
  img: any;
  name;
  date;
  userId;
 
  sliderOpts = {
    zoom: true
  };
  currentUserId;
  
  constructor(public navParam: NavParams,public photoViewer: PhotoViewer, public router: Router, public emailComposer: EmailComposer,
    public db: AngularFireDatabase, public modalCtrl: ModalController, public socialSharing: SocialSharing) { }

  ngOnInit() {
    this.id = this.navParam.get('id');
    this.img = this.navParam.get('img');
    this.name = this.navParam.get('name');
    this.date = this.navParam.get('date');
    this.userId = this.navParam.get('userId');
    this.item = this.db.object("/explore_sample/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.images = data.imgs;
        this.items["$key"] = this.id;
      }
    })
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
      } 
    })
  }

  ionViewDidEnter(){
    this.slides.update();
  }

  reportExplore(){
    let email = {
      to: 'hello@mopays.com',
      //cc: 'max@mustermann.de',
      subject: 'Report Explore',
      body: 'Hello Mopays, I notice the following user ' + this.name + ' is violating the app Terms of Service.<br/><br/>Thank you',
      isHtml: true
    };
 
    this.emailComposer.open(email);
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
 
  openProfile(){
    const navData: NavigationExtras = {
      queryParams: {
        from: 'menu',
      }
    };
    this.router.navigate(['my-profile'], navData);
   }
  
  viewUserId(uid: string){
    if(uid == this.currentUserId){
      this.openProfile()
    } else {
    this.router.navigate(['/users-details', {
      id: uid
    }])
     this.close()
    }
  }

 

 

}






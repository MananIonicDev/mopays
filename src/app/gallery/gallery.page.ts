import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { Gallerys } from '../services/gallery';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { ModalController } from '@ionic/angular';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation } from '../app.animations';
import { GalleryListPage } from '../gallery-list/gallery-list.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  GalleryList = [];
  galleryRef;
  galleryList: any[] = [];
  dummy = Array(10);

  constructor(public photoViewer: PhotoViewer, public dataService: DataService, public router: Router, public modalController: ModalController) { }

  ngOnInit() {
    let classRes = this.dataService.getGalleyCat();
    classRes.snapshotChanges().subscribe(res => {
      this.GalleryList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.GalleryList.push(a as Gallerys);
      })
    });

    this.galleryRef = firebase.database().ref('/gallery_list')
    this.galleryRef.once('value', resp => {
      this.galleryList = [];
      this.galleryList = snapshotToArray(resp);
      this.dummy = [];
      console.log('gallery', this.galleryList)
    });

  }

  slideOptions = {
    centeredSlides: true,
    autoplay: true,
    spaceBetween: 5,
  };
  

  async onItemClickFunc(id) {
    const modal = await this.modalController.create({
      component: GalleryListPage,
      componentProps: {catid: id},
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async viewImage(id){
    const modal = await this.modalController.create({
      component: GalleryListPage,
      componentProps: {keyid: id},
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  showModal(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
        this.router.navigate(['/gallery-post'])
      }
    })
  
  }

}

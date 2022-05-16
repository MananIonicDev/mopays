import { Component, OnInit } from '@angular/core';
import { Bookings } from '../services/bookings';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-business-edit',
  templateUrl: './business-edit.page.html',
  styleUrls: ['./business-edit.page.scss'],
})
export class BusinessEditPage implements OnInit {

  CategoriesList = [];
  format;
  bookingList;
  id;
  item: AngularFireObject<any>;
  public items: any = {};



  constructor(public dataService: DataService, public navCtrl: NavController,
    public db: AngularFireDatabase,
    public modalCtrl: ModalController, public toastCtrl: ToastController,
    public route: ActivatedRoute, public camera: Camera,
    public actionSheetCtrl: ActionSheetController) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.bookingList = firebase.database().ref('/booking_shop/' + this.id);

  }

  ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getBookingCat();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as Bookings);
      })
    })

    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/booking_shop/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        //this.images = data.images;
        this.items["$key"] = this.id;
      }
    })

  }

  goSubmit() {
    this.bookingList.update({
      name: this.items.name,
      open: this.items.open,
      description: this.items.description,
      close: this.items.close,
      category: this.items.category,
      location: this.items.location,
      latitude: this.items.latitude,
      longitude: this.items.longitude,
      images: this.items.images,
      phoneNumber: this.items.phoneNumber,
      website: this.items.website,
      facebook: this.items.facebook,
    })
    this.navCtrl.pop();
    this.showToast('Successfully Update');
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }


  fetchCategorys() {
    this.dataService.getBookingCat().valueChanges().subscribe(res => {
      console.log(res)
    })
  }


  async shareLocation() {
    const modal = await this.modalCtrl.create({
      component: AutoCompletePage,
      cssClass: 'half-modal'
    });
    modal.present();

    //Get returned data
    const { data } = await modal.onWillDismiss();
    console.log('this is the data', data)
    this.items.location = data.address;
    this.items.latitude = data.lat;
    this.items.longitude = data.long;
    console.log(this.items.longitude, this.items.latitude, this.items.location)
  }



  /*onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.items.image = (<FileReader>event.target).result;
      }
    }
  }*/

  async presentImageSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Choose photos from",
      buttons: [
        {
          icon: 'images',
          text: 'Gallery',
          handler: () => {
            //this.getImages()
            var options = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              //allowEdit: true,
              encodingType: this.camera.EncodingType.JPEG,
              saveToPhotoAlbum: false
            };

            this.camera.getPicture(options).then((imgUrl) => {

              this.items.images.push({
                src: 'data:image/png;base64,'+imgUrl,
            });

            }, (err) => {
              console.log(JSON.stringify(err))
            });
          }
        },
        {
          icon: 'camera',
          text: 'Camera',
          handler: () => {

            var options = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              sourceType: this.camera.PictureSourceType.CAMERA,
              //allowEdit: true,
              encodingType: this.camera.EncodingType.JPEG,
              saveToPhotoAlbum: false
            };

            this.camera.getPicture(options).then((imgUrl) => {

              this.items.images.push({
                src: 'data:image/png;base64,'+imgUrl,
            });

            }, (err) => {
              console.log(JSON.stringify(err))
            });
          }
        },
      ]
    });
    actionSheet.present();
  }


  removePhoto(image){
    this.items.images = this.items.images.filter(im => im != image);
  }

}

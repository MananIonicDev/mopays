import { Component, OnInit } from '@angular/core';
import { Bookings } from '../services/bookings';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { Camera } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-add',
  templateUrl: './business-add.page.html',
  styleUrls: ['./business-add.page.scss'],
})
export class BusinessAddPage implements OnInit {

  CategoriesList = [];
  name;
  open = '';
  category;
  description;
  close = '';
  location;
  youtube = '';
  latitude: number;
  longitude: number;
  // Seller information
  photoURL;
  phoneNumber;
  displayName;
  showUploadImage: Boolean = false;
  format;
  url;
  bookingList;
  loading;
  website = '';
  facebook = '';

  imageResponse: Array<{ src: any }>;
  image: string = 'assets/upload.jpg';
  bigImg = null;
  bigSize = '0';
  smallImg = null;
  smallSize = '0';


  constructor(public dataService: DataService, public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController, public router: Router, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public toastCtrl: ToastController, public camera: Camera) {

    this.bookingList = firebase.database().ref('booking_shop');
    this.imageResponse = [];

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
  }

  async goSubmit() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    if (this.imageResponse.length === 0) {
      this.imageResponse = [{ src: 'assets/upload.jpg' }];
    }
    this.bookingList.push({
      userId: firebase.auth().currentUser.uid,
      name: this.name,
      open: this.open,
      description: this.description,
      close: this.close,
      category: this.category,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      totalRatting: 0,
      youtube: this.youtube,
      ratting: 0,
      //image: this.url,
      images: this.imageResponse,
      smallImg: this.smallImg,
      phoneNumber: this.phoneNumber,
      website: this.website,
      facebook: this.facebook,
    }).then(newBooking => {

      let myId = firebase.auth().currentUser.uid
      firebase.database().ref('/users/' + myId).update({
        shopCreated: 'active',
        shopId: newBooking.key
      })
      this.navCtrl.pop();
      //this.showToast('Listen Created Successfully');
      this.loading.dismiss()
      this.showToasts('Listen Created Successfully', newBooking.key);

    })

  }

  async showToasts(message, key) {
    await this.toastCtrl.create({
      message: message,
      duration: 6000,
      //position: 'middle',
      //cssClass: 'my-custom-class',
      buttons: [
        {
          side: 'end',
          text: 'Please View it',
          handler: () => {
            this.router.navigate(['/business-details', { id: key }])
          }
        }, {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    }).then((obj) => {
      obj.present();
    });
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

  ionViewDidEnter() {
    this.getSellerInfo();
  }


  getSellerInfo() {
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.phoneNumber = snapshot.val().phoneNumber;
    });
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
    this.location = data.address;
    this.latitude = data.lat;
    this.longitude = data.long;
    console.log(this.longitude, this.latitude, this.location)
  }

  goImageUpload() {
    this.showUploadImage = true;
  }

  goBack() {
    this.showUploadImage = false;
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
        this.url = (<FileReader>event.target).result;
      }
    }
  }*/

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
        //this.url = (<FileReader>event.target).result;
        this.createThumbnail((<FileReader>event.target).result)
        this.imageResponse.push({
          src: (<FileReader>event.target).result
      });
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

              let base64data = 'data:image/jpeg;base64,' + imgUrl;
              this.createThumbnail(base64data)
              this.imageResponse.push({
                src: 'data:image/png;base64,' + imgUrl,
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

              let base64data = 'data:image/jpeg;base64,' + imgUrl;
              this.createThumbnail(base64data)
              this.imageResponse.push({
                src: 'data:image/png;base64,' + imgUrl,
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

  removePhoto(image) {
    this.imageResponse = this.imageResponse.filter(im => im != image);
  }

  createThumbnail(baseImage) {
    this.generateFromImage(baseImage, 200, 200, 0.5, data => {
      this.smallImg = data;
      //this.smallSize = this.getImageSize(this.smallImg);
    });
  }

  generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
    var canvas: any = document.createElement("canvas");
    var image = new Image();

    image.onload = () => {
      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(image, 0, 0, width, height);

      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);

      callback(dataUrl)
    }
    image.src = img;
  }

  getImageSize(data_url) {
    var head = 'data:image/jpeg;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024 * 1024)).toFixed(4);
  }




}


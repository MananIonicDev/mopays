import { Component, OnInit } from '@angular/core';
import { SubCategorys } from '../services/listing-subcat';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { Camera } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-explore-submit',
  templateUrl: './explore-submit.page.html',
  styleUrls: ['./explore-submit.page.scss'],
})
export class ExploreSubmitPage implements OnInit {

  CategoriesList = [];
  name;
  price;
  category;
  pricetype;
  location;
  latitude: number;
  longitude: number;
  // Seller information
  photoURL;
  phoneNumber;
  displayName;
  showUploadImage: Boolean = false;
  format;
  url;
  imageResponse: Array<{ src: any }>;
  bigImg = null;
  bigSize = '0';
  smallImg = null;
  smallSize = '0';
  exploreRef: any;
  exploreList = [];
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  base64data;
  description = "";

  constructor(public dataService: DataService, public navCtrl: NavController, public db: AngularFireDatabase,
    public modalCtrl: ModalController, public toastCtrl: ToastController, public camera: Camera,
    public actionSheetCtrl: ActionSheetController, public route: ActivatedRoute) {
    this.imageResponse = [];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.item = this.db.object("/explore_sample/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.images = data.imgs;
        this.items["$key"] = this.id;
      }
    })
  }

  goSubmit() {
    firebase.database().ref('explore_sample').child(this.id).update({
      imgs: this.images,
    }).then((success) => {
      this.navCtrl.pop();
      this.showToast('Posted');
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
    })
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }




  ionViewDidEnter() {
    this.getSellerInfo();
  }


  getSellerInfo() {
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.displayName = snapshot.val().displayName;
      this.phoneNumber = snapshot.val().phoneNumber;
      this.photoURL = snapshot.val().photoURL;
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

              this.images.push({
                src: 'data:image/png;base64,' + imgUrl,
                name: this.displayName,
                userId: firebase.auth().currentUser.uid,
                photo: this.photoURL,
                description: this.description,
                date: firebase.database.ServerValue.TIMESTAMP,
              });

              //let base64data = 'data:image/jpeg;base64,' + imgUrl;
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

              //let base64data = 'data:image/jpeg;base64,' + imgUrl;
              //this.createThumbnail(base64data)
              this.images.push({
                src: 'data:image/png;base64,' + imgUrl,
                name: this.displayName,
                userId: firebase.auth().currentUser.uid,
                photo: this.photoURL,
                description: this.description,
                date: firebase.database.ServerValue.TIMESTAMP,
              });

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






}

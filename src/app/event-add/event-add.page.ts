import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { Camera } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.page.html',
  styleUrls: ['./event-add.page.scss'],
})
export class EventAddPage implements OnInit {


  name;
  description;
  date;
  location;
  latitude: number;
  longitude: number;
  photoURL;
  phoneNumber;
  displayName;
  verified;
  format;
  url;
  loading;


  constructor(public dataService: DataService, public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public toastCtrl: ToastController,
    public camera: Camera, public router: Router) {

  }

  ngOnInit() {

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
              targetWidth: 500,
              targetHeight: 500,
              saveToPhotoAlbum: false
            };

            this.camera.getPicture(options).then((imgUrl) => {

              this.url = 'data:image/jpeg;base64,' + imgUrl;
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
              targetWidth: 500,
              targetHeight: 500,
              saveToPhotoAlbum: false
            };
            this.camera.getPicture(options).then((imgUrl) => {
              this.url = 'data:image/jpeg;base64,' + imgUrl;
            }, (err) => {
              console.log(JSON.stringify(err))
            });
          }
        },
      ]
    });
    actionSheet.present();
  }



  async goSubmit() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    firebase.database().ref('events').push({
      userId: firebase.auth().currentUser.uid,
      name: this.name,
      description: this.description,
      date: this.date,
      venue: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      photoURL: this.photoURL,
      image: this.url,
      phoneNumber: this.phoneNumber,
      displayName: this.displayName,
      Verified: this.verified,
    }).then((success) => {
      this.navCtrl.pop();
      this.showToast('Event Post');
      this.loading.dismiss()
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
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



  ionViewDidEnter() {
    this.getSellerInfo();
  }


  getSellerInfo() {
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.displayName = snapshot.val().displayName;
      this.phoneNumber = snapshot.val().phoneNumber;
      this.photoURL = snapshot.val().photoURL;
      this.verified = snapshot.val().verified;
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




}

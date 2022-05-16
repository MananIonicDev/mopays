import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  ActionSheetController,
  ModalController, AlertController, LoadingController
} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Camera } from '@ionic-native/camera/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UtilityService } from '../services/utility';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { AddLocationPage } from '../add-location/add-location.page';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-guest-feed-add',
  templateUrl: './guest-feed-add.page.html',
  styleUrls: ['./guest-feed-add.page.scss'],
})
export class GuestFeedAddPage implements OnInit {

  array1 = ["kok", "sousoute", "kkliki", "pravind", "Jugnauth", "msm", "ggt", "fuck", "sex", "manish", "neermul", "pitin", "pilon", "gogot", "bour", "fam", "sexual", "government", "malice", "graine", "ministre", "telecom", "cwa"];

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  task: AngularFireUploadTask;
  cardImageBase64: string;
  images: Array<{ src: any, show: any, id: any }>;
  gif: any;

  percentage: Observable<number>;
  snapshot: Observable<any>;



  allPercentage: Observable<any>

  uploads: any[];

  CategoriesList = [];
  category = '-MdgTgFM6eOQCe_iz8i1';
  ref;

  loading;
  name: string;
  ulocation: string = '';
  age: string = '';
  photo;
  description: String = '';
  date;
  status;
  userId;
  imageResponse: Array<{ src: any }>;
  imageResponseSave: Array<{ src: any }>;
  location = '';
  latitude = '';
  longitude = '';
  videos: any;
  scaleFactor: number = 0.25;
  urlDownload;

  imagesList: Array<{ src: any }>;
  imageUpload: any;


  imageError: string;
  isImageSaved: boolean;
  //cardImageBase64: string;


  public gifImage;
  disableSubmit: boolean = false;
  hideAnnouncement: boolean;
  youtubelink;
  url;
  format;
  privacy;
  formatImage;
  selectedFile;
  imageUrl;

  zoom: number = 12;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  downloadURLString: string;

  uploadVal = 0;


  myFiles: string[] = [];

  constructor(public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public router: Router, public camera: Camera, public storage: AngularFireStorage,
    public toastCtrl: ToastController, public util: UtilityService, public route: ActivatedRoute,
    public modalCtrl: ModalController, public theInAppBrowser: InAppBrowser) {
    this.imageResponse = [];
    this.images = [];
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.imageResponse.push({
          src: params.special
        });
      }
    });
  }

  ngOnInit() {
    this.date = new Date();
    this.date = formatDate(this.date, 'yyMdSSS', 'en-US');
    this.userId = 'anonymous' + this.date;
    this.getCategories();
  }

  goRegister(){
    this.router.navigate(['/login'])
  }

  getCategories() {
    this.ref = firebase.database().ref('/feed_categories')
    this.ref.on('value', catList => {
      let categories = [];

      catList.forEach(res => {
        let item = res.val();
        item.key = res.key;
        categories.push(item);
        this.CategoriesList = categories;
        this.category = '-MdgTgFM6eOQCe_iz8i1';
      });
    });
  }

  getMatch() {
    var text = this.description.toLowerCase().trim().split(" ");
    var matchedWords = []
    for (var i = 0; i < this.array1.length; i++) {
      for (var e = 0; e < text.length; e++) {
        if (this.array1[i] === text[e]) matchedWords.push(this.array1[i]);
      }
    }
    if (matchedWords.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  // TEXT UPLOAD
  async addFeedTextOnly() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      //privacy: this.privacy,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
    });
  }

  async addFeedImageOnly() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      //privacy: this.privacy,
      images: this.imageResponse,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
    });
  }




  async addFeedTextImage() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      //privacy: this.privacy,
      images: this.imageResponse,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
    });
  }

  async addFeedLocation() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
    })
  }

  async addFeedTextLocation() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      //privacy: this.privacy,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
    });
  }

  onTrigger() {
    document.getElementById('filevideo').click();
  }


  onSelectFile(event) {
    this.selectedFile = event.target.files
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('img') > -1) {
        this.format = 'img';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  async shareLocation() {
    const modal = await this.modalCtrl.create({
      component: AddLocationPage,
      //cssClass: 'half-modal'
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

              let base64data = 'data:image/jpeg;base64,' + imgUrl;
              //let id = this.util.makeid(20)
              //let base64data = this.dataURItoBlob('data:image/jpeg;base64,' + imgUrl);
              this.imageResponse.push({
                //src: base64data,
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
              //let id = this.util.makeid(20)
              //let base64data = this.dataURItoBlob('data:image/jpeg;base64,' + imgUrl);
              this.imageResponse.push({
                src: 'data:image/jpeg;base64,' + imgUrl

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

  async uploadFileVideo(id, file): Promise<any> {
    if (file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('videos').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`videos/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create();
    return this.loading.present();
  }

  async presentVideoSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Choose video from",
      buttons: [
        {
          icon: 'images',
          text: 'Gallery',
          handler: () => {
            this.onTrigger();
          }
        },
        {
          icon: 'logo-youtube',
          text: 'YouTube',
          handler: () => {
            this.YoutubeLink();
          }
        },
      ]
    });
    actionSheet.present();
  }

  async YoutubeLink() {
    const alert = await this.alertCtrl.create({
      header: 'YouTube Video',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter Video ID e.g. 9ao4FEaDGhQ',
        }
      ],
      buttons: [{
        text: 'Submit',
        handler: (res) => {
          this.youtubelink = res.otp;
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log("Alert dismissed!");
        }
      },
      ]
    });
    await alert.present();
  }

  async addFeedVideo() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    //this.loading = await this.loadingCtrl.create();
    //await this.loading.present();
    let myId = this.util.makeid(20);
    const imageUrl = await this.uploadFileVideo(myId, this.selectedFile)
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      video: imageUrl,
      //privacy: this.privacy,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.showToasts();
      //this.loading.dismiss()
    })
  }

  async addFeedTextYoutube() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    //this.loading = await this.loadingCtrl.create();
    //await this.loading.present();
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      youtube: this.youtubelink,
      //privacy: this.privacy,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.router.navigate(['/tabs/tab1'])
      this.showToasts();
      //this.loading.dismiss()
    })
  }

  async addFeedYoutube() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    //this.loading = await this.loadingCtrl.create();
    //await this.loading.present();
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      youtube: this.youtubelink,
      //privacy: this.privacy,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.router.navigate(['/tabs/tab1'])
      this.showToasts();
      //this.loading.dismiss()
    })
  }


  async addFeedTextVideo() {
    if (this.getMatch()) {
      this.status = "Pending";
    }
    else {
      this.status = "Approved";
    }
    //this.loading = await this.loadingCtrl.create();
    //await this.loading.present();
    let myId = this.util.makeid(20);
    const imageUrl = await this.uploadFileVideo(myId, this.selectedFile)
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: this.userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      guestLocation: this.ulocation,
      category: this.category,
      age: this.age,
      video: imageUrl,
      //privacy: this.privacy,
      anonymousUser: true,
      status: this.status,
    }).then(newFeed => {
      //this.showToast('Post')
      this.showToasts();
      //this.loading.dismiss()
    })
  }

  goLink() {
    let target = "_blank";
    let link = 'https://www.mopays.com/tos';
    this.theInAppBrowser.create(link, target, this.options);
  }

  goEmergency() {
    this.router.navigate(['/emergency']);
  }

  async showToasts() {
    await this.toastCtrl.create({
      header: 'Thanks for Posting',
      message: 'Your post will be displayed soon if accepted.',
      duration: 6000,
      //position: 'middle',
      //cssClass: 'my-custom-class',
      buttons: [{
        side: 'end',
        icon: 'Close',
        role: 'cancel',
        handler: () => {
          console.log('Close clicked');
        }
      }]
    }).then((obj) => {
      obj.present();
    });
  }

}

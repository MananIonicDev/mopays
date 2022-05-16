import { Component, OnInit } from '@angular/core';
import { SubCategorys } from '../services/listing-subcat';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { Camera } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-sell',
  templateUrl: './listing-sell.page.html',
  styleUrls: ['./listing-sell.page.scss'],
})
export class ListingSellPage implements OnInit {

  CategoriesList = [];
  name = '';
  price = '';
  category = '';
  description = '';
  pricetype = '';
  location = '';
  latitude = '';
  longitude = '';
  // Seller information
  photoURL = '';
  phoneNumber = '';
  displayName = '';
  Verified = '';
  showUploadImage: Boolean = false;
  format;
  url = '';
  imageResponse: Array<{src: any}>;
  bigImg = null;
  bigSize = '0';
  smallImg = null;
  smallSize = '0';
  loading;

  constructor(public dataService: DataService, public navCtrl: NavController, public router: Router,
    public modalCtrl: ModalController, public toastCtrl: ToastController, public camera: Camera, 
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.imageResponse = [];
   }

  ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getSubCategoryList();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as SubCategorys);
      })
    })
}

async goSubmit(){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
  firebase.database().ref('items_sell').push({
    userId: firebase.auth().currentUser.uid,
    name: this.name,
    price: this.price,
    description: this.description,
    pricetype: this.pricetype,
    category: this.category,
    location: this.location,
    latitude: this.latitude,
    longitude: this.longitude,
    photoURL: this.photoURL,
    images: this.imageResponse,
    smallImg: this.smallImg,
    phoneNumber: this.phoneNumber,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
    displayName: this.displayName,
    Verified: this.Verified,
  }).then(newFeed =>{
    this.navCtrl.pop();
    //this.showToast('Post')
    this.showToasts('Listing Created Successfully', newFeed.key);
    this.loading.dismiss()
    let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/'  + myId).child('points').set(points);  
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
          this.router.navigate(['/listing-details', {id: key}])
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


fetchCategorys() {
  this.dataService.getSubCategoryList().valueChanges().subscribe(res => {
    console.log(res)
  })
}

ionViewDidEnter(){
  this.getSellerInfo();
}


getSellerInfo(){
 return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
   this.displayName = snapshot.val().displayName;
   this.phoneNumber = snapshot.val().phoneNumber;
   this.photoURL = snapshot.val().photoURL;
   if (snapshot.val().verified != null){
    this.Verified = snapshot.val().verified;
   }
   else {
    this.Verified = '';
   }
   }); 
}

async shareLocation(){
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

goImageUpload(){
  this.showUploadImage = true;
}

goBack(){
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
      //this.url = (<FileReader>event.target).result;
      this.createThumbnail((<FileReader>event.target).result)
      this.imageResponse.push({
        src: (<FileReader>event.target).result
    });
    }
  }
}*/

async presentImageSheet(){
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

                 let base64data = 'data:image/jpeg;base64,' + imgUrl;
                 this.createThumbnail(base64data)
                 this.imageResponse.push({
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
  return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
}



}

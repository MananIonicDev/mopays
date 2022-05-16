import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { ServiceCategorys } from '../services/service_provider';
import { Camera } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.page.html',
  styleUrls: ['./service-add.page.scss'],
})
export class ServiceAddPage implements OnInit {

  CategoriesList = [];
  name;
  minimum;
  category;
  description;
  photoURL;
  phoneNumber;
  displayName;
  showUploadImage: Boolean = false;
  format;
  url = 'assets/upload.jpg';
  bookingList;
  loading;
  whatsapp = '';
  facebook = '';
  

  constructor(public dataService: DataService, public navCtrl: NavController, 
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public toastCtrl: ToastController, public router: Router,
    public camera: Camera) {

      this.bookingList = firebase.database().ref('service_provider');
    
   }

  ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getServiceCat();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as ServiceCategorys);
      })
    })
}

async goSubmit(){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
  this.bookingList.push({
    userId: firebase.auth().currentUser.uid,
    name: this.name,
    description: this.description,
    category: this.category,
    totalRatting: 0,
    ratting: 0,
    image: this.url,
    phoneNumber: this.phoneNumber,
    Date: firebase.database.ServerValue.TIMESTAMP,
    whatsapp: this.whatsapp,
    facebook: this.facebook,
  }).then( newBooking =>{
    let myId = firebase.auth().currentUser.uid
     firebase.database().ref('/users/' + myId).update({
        serviceCreated: 'active',
        serviceId: newBooking.key
     })
     this.navCtrl.pop();
     this.showToasts('Listing Created', newBooking.key);
     this.loading.dismiss()
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
          this.router.navigate(['/service-details', {id: key}])
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
  this.dataService.getServiceCat().valueChanges().subscribe(res => {
    console.log(res)
  })
}

ionViewDidEnter(){
  this.getSellerInfo();
}


getSellerInfo(){
 return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
   this.phoneNumber = snapshot.val().phoneNumber;
   }); 
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
      this.url = (<FileReader>event.target).result;
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
           allowEdit: true,
           encodingType: this.camera.EncodingType.JPEG,
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
              allowEdit: true,
              encodingType: this.camera.EncodingType.JPEG,
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



}

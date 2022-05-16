import { Component, OnInit } from '@angular/core';
import { JobCategorys } from '../services/job_category';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController, LoadingController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-jobs-add',
  templateUrl: './jobs-add.page.html',
  styleUrls: ['./jobs-add.page.scss'],
})
export class JobsAddPage implements OnInit {

  CategoriesList = [];
  name;
  category;
  description;
  type;
  salary = '';
  website = '';
  apply;
  deadline = '';
  jobId;
  location = '';
  latitude: number = 0;
  longitude: number = 0;
  url = "assets/upload.jpg";
  photoURL;
  phoneNumber;
  displayName;
  verified;
  loading;
 

  constructor(public dataService: DataService, public navCtrl: NavController, public camera: Camera, public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
   
   }

   stringGen(len){
    var text = " ";
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
  }

  ngOnInit() {
    this.jobId = this.stringGen(6)
    this.fetchCategorys();
    let catRes = this.dataService.getJobCatList();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as JobCategorys);
      })
    })
}

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

async goImageUpload(){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
  firebase.database().ref('jobs').push({
    userId: firebase.auth().currentUser.uid,
    name: this.name,
    salary: this.salary,
    description: this.description,
    type: this.type,
    apply: this.apply,
    website: this.website,
    category: this.category,
    location: this.location,
    latitude: this.latitude,
    longitude: this.longitude,
    photoURL: this.photoURL,
    jobId: this.jobId,
    image: this.url,
    deadline: this.deadline,
    phoneNumber: this.phoneNumber,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
    displayName: this.displayName,
    Verified: this.verified,
  }).then((success)=>{
    this.navCtrl.pop();
    this.showToast('Submitted');
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

async showToast(message) {
  let toast = await this.toastCtrl.create({
    message: message,
    duration: 3000,
  });
  toast.present();
}


fetchCategorys() {
  this.dataService.getJobCatList().valueChanges().subscribe(res => {
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
   this.verified = snapshot.val().verified;
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




}

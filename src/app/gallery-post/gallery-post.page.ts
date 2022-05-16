import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { ToastController, NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Gallerys } from '../services/gallery';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-gallery-post',
  templateUrl: './gallery-post.page.html',
  styleUrls: ['./gallery-post.page.scss'],
})
export class GalleryPostPage implements OnInit {

  CategoriesList = [];
  category;
  photoURL;
  displayName;
  format;
  url;
  description;
  loading;

  constructor(public dataService: DataService, 
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public camera: Camera,
    public router: Router, public toastCtrl: ToastController) {
  
   }

  ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getGalleyCat();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as Gallerys);
      })
    })
}



async goSubmit(){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
  firebase.database().ref('gallery_list').push({
    userId: firebase.auth().currentUser.uid,
    category: this.category,
    photoURL: this.photoURL,
    image: this.url,
    commentLength: 0,
    haveILiked: false,
    Score: 1,
    description: this.description,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
    displayName: this.displayName
  }).then((success)=>{
    this.navCtrl.pop();
    this.showToast('Posted');
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
  this.dataService.getGalleyCat().valueChanges().subscribe(res => {
    console.log(res)
  })
}

ionViewDidEnter(){
  this.getSellerInfo();
}


getSellerInfo(){
 return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
   this.displayName = snapshot.val().displayName;
   this.photoURL = snapshot.val().photoURL;
   }); 
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



}

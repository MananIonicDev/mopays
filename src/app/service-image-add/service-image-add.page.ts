import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-service-image-add',
  templateUrl: './service-image-add.page.html',
  styleUrls: ['./service-image-add.page.scss'],
})
export class ServiceImageAddPage implements OnInit {

  id;
  name = '';
  price = '';
  format;
  url;
  description = '';
  productList;

  constructor(public route: ActivatedRoute, public navCtrl: NavController,
    public toastCtrl: ToastController, public camera: Camera, 
    public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.productList = firebase.database().ref('/service_provider/' + this.id).child('product');
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  

  goImageUpload(){
    this.productList.push({
      userId: firebase.auth().currentUser.uid,
      name: this.name,
      description: this.description,
      image: this.url,
    }).then((success) =>{
      //this.productList.child(newProduct.key).child('id').set(newProduct.key);
       this.navCtrl.pop();
       this.showToast('add Successful');
    })
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


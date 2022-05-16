import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase';
import { UtilityService } from '../services/utility';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.page.html',
  styleUrls: ['./upload-photos.page.scss'],
})
export class UploadPhotosPage implements OnInit  {
 //

  selectedFile: any;
  loading: HTMLIonLoadingElement;
  format;
  url;
  description = '';
  name;
  photo;
  base64;

  constructor(public util: UtilityService, public toastCtrl: ToastController,
    private navCtrl: NavController, private storage: AngularFireStorage, public actionSheetCtrl: ActionSheetController,
    private loadingController: LoadingController, public camera: Camera) {
    
  }

  ngOnInit(){
    this.getInfo()
  }

 /* onTrigger(){
    document.getElementById('imagepick').click();
  }
  

  chooseFile (event) {
    this.selectedFile = event.target.files
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

  getInfo(){
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.name = snapshot.val().displayName;
      this.photo = snapshot.val().photoURL;
      }); 
  }


  async addTodo(){
    //let myId = this.util.makeid(20);
    //const imageUrl = await this.uploadFile(myId, this.selectedFile)
    await this.presentLoading();
    firebase.database().ref('photo_list').push({
      userId: firebase.auth().currentUser.uid,
      image: this.base64,
      date: firebase.database.ServerValue.TIMESTAMP,
      Score: 1,
      haveILiked: false,
      description: this.description,
      Name: this.name,
      Photo: this.photo,
    })
    this.navCtrl.pop();
    this.loading.dismiss()
    this.showToast('Upload successful')
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  /*async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('images').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }*/

 


  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return this.loading.present();
  }



  /*remove(item){
    console.log(item);
    if(item.imageUrl) {
      this.storage.ref(`images/${item.id}`).delete()
    }
    //this.itemsRef.doc(item.id).delete()
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
               //let id = this.util.makeid(20)
               this.base64 = 'data:image/jpeg;base64,' + imgUrl;
              
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
                   this.base64 = 'data:image/jpeg;base64,' + imgUrl;
                  
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
import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ToastController, ActionSheetController, AlertController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Camera } from '@ionic-native/camera/ngx'; 

@Component({
  selector: 'app-group-feed-edit',
  templateUrl: './group-feed-edit.page.html',
  styleUrls: ['./group-feed-edit.page.scss'],
})
export class GroupFeedEditPage implements OnInit {

  avatar = "assets/imgs/profile.jpg";
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  format;
  loading;
  formatImage;

  constructor(public platform: Platform, public route: ActivatedRoute, 
    public loadingCtrl: LoadingController, public camera: Camera,
    public db: AngularFireDatabase,  public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController, 
    public router: Router, public nav: NavController,
    public toastCtrl: ToastController,) { 
    console.log(platform.height());
    //this.height = platform.height() - 10;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/group_post/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        this.images = data.images;
        this.items["$key"] = this.id;
      }
    })
  }

 async addFeedTextOnly(){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();

    firebase.database().ref('group_post').child(this.id).update({
      //privacy: this.items.privacy,
      description: this.items.description,
  }).then(()=>{
     //this.loading.d
     this.loading.dismiss()
      this.nav.pop()
      this.showToast('Update Successfully')
   })
   
}

async  addFeedImageOnly(){
  this.loading = await this.loadingCtrl.create();
          await this.loading.present();
  firebase.database().ref('group_post').child(this.id).update({
    //privacy: this.items.privacy,
    images: this.images,
  }).then((success)=>{
    this.loading.dismiss()
      this.nav.pop();
      this.showToast('Update Successfully')
   })
}


async addFeedTextImage(){
  this.loading = await this.loadingCtrl.create();
          await this.loading.present();
    firebase.database().ref('group_post').child(this.id).update({
      description: this.items.description,
      //privacy: this.items.privacy,
      images: this.images,
    }).then((success)=>{
      this.nav.pop()
      //this.router.navigate(['/tabs/feed'])
      this.showToast('Update Successfully')
   })
}




onSelectFile(event) {
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
      this.items.video = (<FileReader>event.target).result;
    }
  }
}

onTrigger(){
  document.getElementById('filevideo').click();
}


  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
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
             allowEdit: true,
             encodingType: this.camera.EncodingType.JPEG,
             saveToPhotoAlbum: false
           };

            this.camera.getPicture(options).then((imgUrl) => {

               let base64data = 'data:image/jpeg;base64,' + imgUrl;
               this.images.push({
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
                allowEdit: true,
                encodingType: this.camera.EncodingType.JPEG,
                saveToPhotoAlbum: false
              };
                this.camera.getPicture(options).then((imgUrl) => {
 
                   let base64data = 'data:image/jpeg;base64,' + imgUrl;
                   this.images.push({
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

  /*onTriggerImage(){
    document.getElementById('file').click();
  }

  onSelectFileImage(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.formatImage = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.formatImage = 'video';
      }
      reader.onload = (event) => {
        //this.url = (<FileReader>event.target).result;
        this.images.push({
          src: (<FileReader>event.target).result
      });
      }
    }
  }*/

  removePhoto(image){
    this.images = this.images.filter(im => im != image);
   }

 


 

}

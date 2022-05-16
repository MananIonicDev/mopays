import { Component } from '@angular/core';
import { ToastController, 
ActionSheetController, 
ModalController, AlertController, LoadingController, NavController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Camera } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-post',
  templateUrl: './group-post.page.html',
  styleUrls: ['./group-post.page.scss'],
})
export class GroupPostPage  {

  loading;
  downloadUrl;
  description: String = '';
  name;
  photo;
  imageResponse: Array<{src: any}>;
  
  videos: any;

  
  public gifImage;
  disableSubmit: boolean = false;
  hideAnnouncement: boolean;
  youtubelink;
  url;
  format;
  privacy;
  formatImage;
  groupId;
  

  constructor(public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public router: Router, public camera: Camera,
    public route: ActivatedRoute, public nav: NavController,
    public toastCtrl: ToastController,  
    public modalCtrl: ModalController) {
    this.imageResponse = []
    this.getInfo()
    this.groupId = this.route.snapshot.paramMap.get('groupId')
  }

  goContent(){
    this.router.navigate(['/contents-accept'])
  }

  
  getInfo(){
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.name = snapshot.val().displayName;
      this.photo = snapshot.val().photoURL;
      }); 
  }

  

  async addFeedTextOnly(){
         this.loading = await this.loadingCtrl.create();
          await this.loading.present();
      let user = firebase.auth().currentUser;
      let userId = user.uid;
      firebase.database().ref('group_post').push({
        Score: 1,
        commentLength: 0,
        haveILiked: false,
        UserId: userId,
        groupId: this.groupId,
        //privacy: this.privacy,
        description: this.description,
        Date: firebase.database.ServerValue.TIMESTAMP,
        Name: this.name,
        Photo: this.photo,
    }).then((success)=>{
      this.nav.pop()
        this.showToast('Post')
          // Get royalty Points here for posting
          this.loading.dismiss()
          let myId = firebase.auth().currentUser.uid
          let points;
          firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
            points = (snapshot.val() && snapshot.val().points);
            points = points + 5;
            firebase.database().ref('/users/'  + myId).child('points').set(points); 
        })
        //alert('Submit successful')
     })
  }

  async addFeedImageOnly(){
    this.loading = await this.loadingCtrl.create();
          await this.loading.present();
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref('group_post').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      groupId: this.groupId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      //privacy: this.privacy,
      images: this.imageResponse,
      Photo: this.photo,
    }).then((success)=>{
      this.nav.pop()
      this.showToast('Post')
       this.loading.dismiss()
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/'  + myId).child('points').set(points);
      })
     // alert('Submit successful')
     })
  }

 
  async addFeedTextImage(){
    this.loading = await this.loadingCtrl.create();
          await this.loading.present();
      let user = firebase.auth().currentUser;
      let userId = user.uid;
      firebase.database().ref('group_post').push({
        Score: 1,
        commentLength: 0,
        haveILiked: false,
        groupId: this.groupId,
        UserId: userId,
        description: this.description,
        Date: firebase.database.ServerValue.TIMESTAMP,
        Name: this.name,
        //privacy: this.privacy,
        images: this.imageResponse,
        Photo: this.photo,
      }).then((success)=>{
        this.nav.pop()
        this.showToast('Post')
        this.loading.dismiss()
        let myId = firebase.auth().currentUser.uid
        let points;
        firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
          points = (snapshot.val() && snapshot.val().points);
          points = points + 5;
          firebase.database().ref('/users/'  + myId).child('points').set(points);
        
    })
    //alert('Submit successful')

      })
   // })
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
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  onTrigger(){
    document.getElementById('filevideo').click();
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
        this.imageResponse.push({
          src: (<FileReader>event.target).result
      });
      }
    }
  }*/
 
     /* async presentGifModal() {
        const modal = await this.modalCtrl.create({
          component: GifSelectPage,
        }); 
        modal.onDidDismiss().then((data) => {
          console.log('page > modal dismissed > data > ', data);
          if(!data){
              console.log('No data')
           } else {
            this.gifImage = data
           }
       });
        return await modal.present();
     }*/



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
               //allowEdit: true,
               encodingType: this.camera.EncodingType.JPEG,
               saveToPhotoAlbum: false
             };

              this.camera.getPicture(options).then((imgUrl) => {

                 let base64data = 'data:image/jpeg;base64,' + imgUrl;
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

   


   
      
}


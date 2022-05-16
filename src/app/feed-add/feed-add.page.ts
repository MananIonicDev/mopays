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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PreviewImagePage } from '../preview-image/preview-image.page';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddLocationPage } from '../add-location/add-location.page';
import * as _ from 'lodash';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';



@Component({
  selector: 'app-feed-add',
  templateUrl: './feed-add.page.html',
  styleUrls: ['./feed-add.page.scss'],
})

export class FeedAddPage implements OnInit {

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

  description: String = '';
  name;
  status;
  photo;
  verified;
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
  youtubelink = '';
  url;
  format;
  privacy;
  formatImage;
  selectedFile;
  imageUrl;


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  downloadURLString: string;

  uploadVal = 0;


  myFiles: string[] = [];

  myForm = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  zoom: number = 12;



  constructor(public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public router: Router, public camera: Camera, public storage: AngularFireStorage,
    public toastCtrl: ToastController, public util: UtilityService, public theInAppBrowser: InAppBrowser,
    public modalCtrl: ModalController, public route: ActivatedRoute) {
    this.imageResponse = [];
    this.images = [];
    this.getInfo();
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.imageResponse.push({
          src: params.special
        });
      }
    });
  }


  getInfo() {
    return firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.name = snapshot.val().displayName;
      this.photo = snapshot.val().photoURL;
      if (snapshot.val().Verified != null){
        this.verified = snapshot.val().Verified;
      }
      else {
        this.verified = '';
      }
      console.log('verified', this.verified)
    });
  }

  ngOnInit() {
    this.getCategories();
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

  goLink() {
    let target = "_blank";
    let link = 'https://www.mopays.com/tos';
    this.theInAppBrowser.create(link, target, this.options);
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      //privacy: this.privacy,
      description: this.description,
      category: this.category,
      status: this.status,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      Photo: this.photo,
      Verified: this.verified,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
      //alert('Submit successful')
    })
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      //privacy: this.privacy,
      images: this.imageResponse,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
      // alert('Submit successful')
    })
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    //this.imageUpload =  this.startUploadImage()
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      //privacy: this.privacy,
      images: this.imageResponse,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);

      })
      //alert('Submit successful')

    })
    // })
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);

      })
      //alert('Submit successful')

    })
    // })
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      //privacy: this.privacy,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.loading.dismiss();
      this.showToasts();
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);

      })
      //alert('Submit successful')

    })
    // })
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



  /*onSelectFileImages(event) {
    
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('vid')> -1){
        this.format = 'vid';
      }
      reader.onload = (event) => {
        this.imageUrl = (<FileReader>event.target).result;
        this.imageResponse.push({
          src: this.imageUrl
        });
      }
    }
  }*/


  /*onFileChange(event) {
    if (event.target.files && event.target.files[0]) {

        var filesAmount = event.target.files.length;

        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {

                  console.log(event.target.result);

                   this.images.push(event.target.result); 


                   this.myForm.patchValue({

                      fileSource: this.images

                   });

                }
                reader.readAsDataURL(event.target.files[i]);

        }

    }

  }*/




  /*SelectFileImages(){
    var files =(<HTMLInputElement>document.getElementById("fileimages")).files;
    var selectedFiles = [];
    //var filesAmount = event.target.files.length;
    //var fileId = this.util.makeid(10)

    //if (event.target.files && event.target.files[0]) {
    
    for (var i = 0; i < files.length; i++){

        //var fileId = this.util.makeid(10)
        var reader = new FileReader();
            reader.onload = (event:any) => {
                //console.log(event.target.result);
                this.images.push(event.target.result); 
          }
          reader.readAsDataURL(event.target.files[i]);
      }

      var obj = {
        name: files[i].name,
        size: files[i].size,
        type: files[i].type,
        src: this.cardImageBase64
      }; 
      selectedFiles.push(obj);
    }

    sessionStorage.setItem("previews", JSON.stringify(selectedFiles));
    //this.AllUpload()
  }*/

  /*startUploadImageText(){
    for(var i = 0; i < this.images.length; i++){
      const path = `files/${this.images[i].id}`;
    const fileRef = this.storage.ref(path);
    this.storage.upload(path, this.images[i].src).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.downloadURL = url;
          //this.fileService.insertImageDetails(this.id,this.url);
          return this.imageResponse.push({src: this.downloadURL})
          //this.addFeedTextImage(imageUpload)
          //alert('Upload Successful');
        })
      })
    ).subscribe();
   }
   this.addFeedTextImage()
  }
  

  async startUploadImage(): Promise<any> {
    for(var i = 0; i < this.images.length; i++){
      try {
        await this.presentLoading();
        const task = await this.storage.ref('files').child(this.images[i].id).put(this.images[i].src)
        this.loading.dismiss();
        return this.storage.ref(`files/${this.images[i].id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }*/



  /*uploadFile() {
    
    
    for(var i = 0; i < this.images.length; i++){

      var filePath = `files/${this.images[i].id}`;

    const fileRef = this.storage.ref(filePath);
     var task = fileRef.putString(this.images[i].show, 'data_url');

    this.uploadVal = 0;
    task.percentageChanges().subscribe(value => {
      this.uploadVal = value;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(val => {
          this.downloadURLString = val;
          console.log(this.downloadURLString);
          this.imageResponse.push({src: this.downloadURLString})
         
        });
      })
    
  )
  .subscribe()
    }
  
  }*/

  /*async startUploadImage() {
    this.loading = await this.loadingCtrl.create();
          await this.loading.present();
    // The storage path
    for(var i = 0; i < this.images.length; i++){
    const path = `files/${this.images[i].id}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.images[i].src);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        //return this.imageResponse.push({src: this.downloadURL})
        this.addFeedImageOnly(this.imageResponse.push({src: this.downloadURL}))
        this.loading.dismiss()
        //this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
   }
  }*/




  /*async AllUpload(){
    await this.presentLoading();
    //var files =(<HTMLInputElement>document.getElementById("fileimages")).files;
    this.uploads = [];
    const allPercentage: Observable<number>[] = [];

    for(var i = 0; i < this.images.length; i++){

    const path = `files/${this.images[i].id}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, this.images[i].src);
    //const task = ref.putString(this.images[i].src);
    const _percentage$ = task.percentageChanges();

    

    allPercentage.push(_percentage$);
    const uploadTask = {
      fileName: this.images[i].id,
       percentage: _percentage$
     }

      this.uploads.push(uploadTask);

      this.loading.dismiss();

      const _t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.imageResponse.push({src: url})
          //return this.addFeedTextImage()
        })
      })
    }
  }*/



  /*fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var filesAmount = fileInput.target.files.length;
        // Size Filter Bytes
        for (let i = 0; i < filesAmount; i++) {
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[i].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    let id = this.util.makeid(20);
                    this.isImageSaved = true;
                    this.images.push({
                      src: this.dataURItoBlob(this.cardImageBase64),
                      show:this.cardImageBase64,
                      id: id
                    })
                    // this.previewImagePath = imgBase64Path;
                    this.uploadFile()
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[i]);
    }
  }
}

dataURItoBlob(dataURI) {
  // codej adapted from:
  //  http://stackoverflow.com/questions/33486352/
  //cant-upload-image-to-aws-s3-from-ionic-camera
      let binary = atob(dataURI.split(',')[1]);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    };*/



  /*async openModal() {
    const modal = await this.modalCtrl.create({
      component: PreviewImagePage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.description = dataReturned.data;
        if(sessionStorage.getItem("send") == "true"){
          sessionStorage.setItem("send", "false");
          var files =(<HTMLInputElement>document.getElementById("fileimages")).files;
          this.uploads = [];
          const allPercentage: Observable<number>[] = [];
    
          for(var i = 0; i < files.length; i++){
          const path = `files/${files[i].name}`;
          const ref = this.storage.ref(path);
          const task = this.storage.upload(path, files[i]);
          const _percentage$ = task.percentageChanges();
    
          allPercentage.push(_percentage$);
          const uploadTask = {
            fileName: files[i].name,
             percentage: _percentage$
           }
      
            this.uploads.push(uploadTask)
    
            const _t = task.then((f) => {
              return f.ref.getDownloadURL().then((url) => {
                return this.imageResponse.push({src: url})
                //return this.addFeedTextImage()
              })
            })
          }
        }
      //})
      if(dataReturned != null && this.description){
      this.addFeedTextImage(this.imageResponse, this.description)
      } else{
       this.addFeedImageOnly(this.imageResponse)
      }
      }
    });

    return await modal.present();
  }

  

  async preview(){
    const modal = await this.modalCtrl.create({
    component: PreviewImagePage,
    componentProps: {images: this.images}
    //cssClass: 'half-modal'
  });
  modal.present();
   const { data } = await modal.onWillDismiss();
   console.log('this is the data', data);
   this.description = data.description;
   //const { datas } = await modal.onWillDismiss().then(() => {
    if(sessionStorage.getItem("send") == "true"){
      sessionStorage.setItem("send", "false");
      var files =(<HTMLInputElement>document.getElementById("fileimages")).files;
      this.uploads = [];
      const allPercentage: Observable<number>[] = [];

      for(var i = 0; i < files.length; i++){
      const path = `files/${files[i].name}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, files[i]);
      const _percentage$ = task.percentageChanges();

      allPercentage.push(_percentage$);
      const uploadTask = {
        fileName: files[i].name,
         percentage: _percentage$
       }
  
        this.uploads.push(uploadTask)

        const _t = task.then((f) => {
          return f.ref.getDownloadURL().then((url) => {
            return this.imageResponse.push({src: url})
            //return this.addFeedTextImage()
          })
        })
      }
    }
  //})
  if(data != null && this.description){
  this.addFeedTextImage(this.imageResponse, this.description)
  } else{
   this.addFeedImageOnly(this.imageResponse)
  }
  }*/


  /*sendImages(){
    //var files =(<HTMLInputElement>document.getElementById("fileimages")).files;
      this.uploads = [];
      const allPercentage: Observable<number>[] = [];
      
      for(var i = 0; i < this.images.length; i++){
      let id = this.util.makeid(10)
      const path = `files/${id}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, this.images[i]);
      const _percentage$ = task.percentageChanges();

      allPercentage.push(_percentage$);
      const uploadTask = {
        fileName: id,
         percentage: _percentage$
       }
        this.uploads.push(uploadTask);
        const _t = task.then((f) => {
          return f.ref.getDownloadURL().then((url) => {
            return this.imageResponse.push({
              src: url
            })
          })
        })
      }
  }*/


  /*async uploadMoreImages(file, fileId, fileName, fileType): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('feedimage').child(fileId).put(file)
        this.loading.dismiss();
        return this.storage.ref(`feedimage/${fileId}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }


  uploadFile(file, fileId, fileName, fileType){
    const uploadTask = firebase.storage().ref(fileName).put(file);
    uploadTask.on("state_changed", snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress)
       firebase.storage().ref(fileName).getDownloadURL().then(ref => {
        this.urlDownload = ref;
        this.imageResponse.push({
          src: 'data:image/png;base64,' + this.urlDownload,
        })
       });
        
     }
    )
  }*/



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



  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
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

  /*markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.location = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }*/

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
                src: 'data:image/jpeg;base64,' + imgUrl,
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

  /*async uploadFileImages(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('imagesmulti').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`imagesmulti/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }*/

  async presentLoading() {
    this.loading = await this.loadingCtrl.create();
    return this.loading.present();
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      youtube: this.youtubelink,
      //privacy: this.privacy,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.showToasts();
      //this.loading.dismiss()
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
      // alert('Submit successful')
    })
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let myId = this.util.makeid(20);
    const imageUrl = await this.uploadFileVideo(myId, this.selectedFile)
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      video: imageUrl,
      //privacy: this.privacy,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.showToasts();
      //this.loading.dismiss()
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
      // alert('Submit successful')
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      youtube: this.youtubelink,
      //privacy: this.privacy,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.showToasts();
      //this.loading.dismiss()
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
      // alert('Submit successful')
    })
    // })
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
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let myId = this.util.makeid(20);
    const imageUrl = await this.uploadFileVideo(myId, this.selectedFile)
    firebase.database().ref('feeds').push({
      Score: 1,
      commentLength: 0,
      haveILiked: false,
      UserId: userId,
      description: this.description,
      Date: firebase.database.ServerValue.TIMESTAMP,
      Name: this.name,
      video: imageUrl,
      //privacy: this.privacy,
      Photo: this.photo,
      Verified: this.verified,
      category: this.category,
      status: this.status,
    }).then(newFeed => {
      this.router.navigate(['/tabs/tab1'])
      //this.showToast('Post')
      this.showToasts();
      //this.loading.dismiss()
      let myId = firebase.auth().currentUser.uid
      let points;
      firebase.database().ref('/users/' + myId).once('value').then(function (snapshot) {
        points = (snapshot.val() && snapshot.val().points);
        points = points + 5;
        firebase.database().ref('/users/' + myId).child('points').set(points);
      })
      // alert('Submit successful')
    })
    // })
  }





}

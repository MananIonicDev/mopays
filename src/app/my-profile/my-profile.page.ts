import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ActionSheetController, IonSlides, ModalController, LoadingController, ToastController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera } from '@ionic-native/camera/ngx';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation } from '../app.animations';
import { ProfileModalPage } from '../profile-modal/profile-modal.page';
import { UserModalPhotosPage } from '../user-modal-photos/user-modal-photos.page';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  

  currentUserId;
  displayName;
  datasList = Array(5);
  photoURL;
  description;
  followingCount;
  followersCount;
  email;
  uid;
  refPost;
  shareUrl = "https://mopays.app"
  @ViewChild(IonSlides, {static: true}) slider: IonSlides;
    segment = 0;
    slideOpts = {
      autoHeight: true,
    };

    @Output() onItemClick = new EventEmitter();
    myphotoURL;
  feeditems = [];
  shops = [];
  points;
  gender;
  about;
  location;
  nationality;
  dob;
  phoneNumber;
  newPhoto;
  format;
  user: any;
  status;
  verified;
  error: string
  from: any;
  myfavourItems = [];
  serviceId;
  serviceCreated;
  shopCreated;
  shopId;
  interestfor;
  marital;
  education;
  dummyBook = Array(10);
  refPostPhoto;
  feedPhoto = [];
  Name;
  Photo;
  zoom: number = 12;
  slideOptions  = {
    zoom: true
  };

  constructor(public router: Router, public authService: AuthsProvider, public socialSharing: SocialSharing, 
    private fireauth: AngularFireAuth, public platform: Platform, public camera: Camera,
    public toastController: ToastController, private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController, public modalController: ModalController, public loadingCtrl: LoadingController) { 

 


  }

  async segmentChanged(event) {
    await this.slider.slideTo(this.segment);
    this.slider.update();
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    this.focusSegment(this.segment+1);
  }
  
  focusSegment(segmentId) {
    document.getElementById('seg-'+segmentId).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

 /* getToken(){
    return this.fcm.getToken().then(token => {
      console.log(token);
      firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
        Usertoken: token
      });
    })
  }*/

 
  
 
  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log(data);
      if (data && data.from) {
        this.from = data.from;
      }
    });
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
        this.loaduserdetails(user.uid)
        
      } 
    })
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    })
    this.getFeed()
    this.getPhotoGallery()
    //this.getGallery()
    

   //let myId = this.currentUserId;
    let bb = this.myfavourItems;
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
      let favouritesKey = snapshot.val().favourites || [];
      console.log(favouritesKey)
      for (let i = 0; i < favouritesKey.length; i++) {
           console.log(favouritesKey[i])
           firebase.database().ref('/favourites/' + favouritesKey[i]).once('value').then(function (snapshot) {
            let img = (snapshot.val() && snapshot.val().img) || 'There is no name';
            let name = (snapshot.val() && snapshot.val().name) || 'There is no name';
            bb.push({ "img": img, "name": name});
           })
           }
        
      }) 
  }

  shareSheetShare(description) {
    this.socialSharing.share(description,"MopaysApp", description, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  shareSheetShareImage(img){
    this.socialSharing.share(null,"MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  addFavourite(){
    const navData: NavigationExtras = {
      queryParams: {
        from: 'profile',
      }
    };
    this.router.navigate(['favourite'], navData);
  }

  shareSheetShareImageText(img, text){
    this.socialSharing.share(text,"MopaysApp", img, this.shareUrl).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  getPhotoGallery(){
    let myId = firebase.auth().currentUser.uid;
    this.refPostPhoto = firebase.database().ref('/photo_list').orderByChild('userId').equalTo(localStorage.getItem('uid'))
    this.refPostPhoto.on('value', feedList =>{
    let feeds = []; 
    feedList.forEach( feed => {
      let item = feed.val();
      item.key = feed.key;
      item.likes = feed.val().likes || [];
      //item.Date = child.val().Date;
      item.haveILiked = feed.val().haveILiked;
      item.userId = feed.val().userId;
      for (let i = 0; i < item.likes.length; i++) {
        if (item.likes[i] === myId) {
           item.haveILiked = true;
        }
        firebase.database().ref('users/' + item.userId).once('value', (snapshot) => {
          item.Name = snapshot.val().displayName;
          item.Photo = snapshot.val().photoURL;
      });
    }
    feeds.push(item);  
      this.feedPhoto = feeds;  
      this.dummyBook = [];
    }); 
   });
 // });     
}





  getFeed(){
    this.refPost = firebase.database().ref('/feeds').orderByChild('UserId').equalTo(firebase.auth().currentUser.uid)
    this.refPost.on('value', feedList =>{
    let feeds = []; 

    feedList.forEach( feed => {
      let likes = feed.val().likes || [];
      let haveILiked = feed.val().haveILiked;

       for (let i = 0; i < likes.length; i++) {
           if (likes[i] === this.currentUserId) {
              haveILiked = true;
           }
       }

    feeds.push({
        postId: feed.key,
        userId: feed.val().UserId,
        score: feed.val().Score,
        description: feed.val().description,
        images: feed.val().images || [],
        video: feed.val().video,
        youvideo: feed.val().youvideo,
        timeStamp: feed.val().Date,
        userPhoto: feed.val().Photo,
        userName: feed.val().Name,
        location: feed.val().location,
         latitude: feed.val().latitude,
         longitude: feed.val().longitude,
        comments: feed.val().comments,
        likes: likes,
        commentLength: feed.val().commentLength,
        haveILiked: haveILiked,
    });  
      this.feeditems = feeds;  
    }); 
  });     
}

dashboard(){
  this.router.navigate(['/my-dashboard'])
}

 logOut(){
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/login'])
      localStorage.removeItem('uid')
    })
  }

  openChat(){
    this.router.navigate(['/inbox']) 
  }

  async viewMyProfile(img){
    const modal = await this.modalController.create({
      component: ProfileModalPage,
      componentProps: {img: img},
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async viewmyImage(key, Name, Photo, image, date, userId, description){
    const modal = await this.modalController.create({
      component: UserModalPhotosPage,
      componentProps: {img: image, photo: Photo, id: key, name: Name, date: date, userId: userId, description: description},
      mode: 'ios',
      cssClass: 'story-modal',
      swipeToClose: true,
      enterAnimation: StoryModalEnterAnimation,
      leaveAnimation: StoryModalLeaveAnimation,
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }


  loaduserdetails(id) {
      this.authService.getuserdetails(id).then((res: any) => {
        this.displayName = res.displayName;
        this.photoURL = res.photoURL;
        this.description = res.description;
        this.email = res.email;
        this.uid = res.uid;
        this.status = res.status;
        this.location = res.location;
        this.about = res.about;
        this.phoneNumber = res.phoneNumber;
        this.nationality = res.nationality;
        this.followersCount = res.followersCount;
        this.points = res.points;
        this.dob = res.dob;
        this.interestfor = res.interestfor
        this.marital = res.marital;
        this.education = res.education;
        this.gender = res.gender;
        this.followingCount = res.followingCount;
        this.serviceId = res.serviceId;
        this.serviceCreated = res.serviceCreated;
        this.shopCreated = res.shopCreated;
        this.shopId = res.shopId;
        this.verified = res.verified;
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
        this.photoURL = (<FileReader>event.target).result;
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
          photoURL: this.photoURL
        })
        this.updatePhoto(this.photoURL)
      }
    }
  }

  onTrigger(){
    document.getElementById('file').click();
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
 
               this.photoURL = 'data:image/jpeg;base64,' + imgUrl;
               firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
                 photoURL: this.photoURL
               })
               this.updatePhoto(this.photoURL)
             
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
  
                   this.photoURL = 'data:image/jpeg;base64,' + imgUrl;
                   firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
                    photoURL: this.photoURL
                  })
                  this.updatePhoto(this.photoURL)
                   
                 }, (err) => {
                   console.log(JSON.stringify(err))
                 });
             }
         },
       ]
     });
     actionSheet.present();
  }


  upload(){
    this.router.navigate(['/upload-photos'])
  }

  updatePhoto(photo) {
    this.user.updateProfile({
      photoURL: photo
    }).then(() => {
        this.presentToast('Email updated', 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

  goFollowing(uid){
    this.router.navigate(['/following', {
      id:uid
    }])
  }

  goEdit(){
    this.router.navigate(['/edit-profile'])
  }

  goFollowers(uid){
    this.router.navigate(['/followers', {
      id:uid
    }])
  }

  goComment(postId, userId, commentLength){
    this.router.navigate(['/feed-comment', {
      postId: postId,
      userId: userId,
      commentLength: commentLength,
    }])
  }

  goCommy(postId, userId, commentLength){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
         this.goComment(postId, userId, commentLength)
      }
    })

  }

  
  editFeeds(id, item){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['login'])
    }  else {
         this.router.navigate(['/feed-edit', {
           id:id,
           item:item
         }])
     }
   })
  }

  deleteFeeds(id, item){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("not login");
        this.router.navigate(['login'])
    }  else {
         firebase.database().ref('feeds').child(id).remove().then(function (){})
         let index = this.feeditems.indexOf(item);
      if (index > -1) {
        this.feeditems.splice(index, 1);
      }
     }
   })
  }


  getCurrentUser(myId){
    return firebase.database().ref('users/' + myId).once('value', (snapshot) => {
      //console.log(snapshot.val().name);
      this.myphotoURL = snapshot.val().photoURL;
    })
  }
  
  async presentActionSheetUser(id, item, description) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Edit Feed',
        role: 'destructive',
        handler: () => {
          this.editFeeds(id, item)
        }
      },  {
        text: 'Delete Feed',
        handler: () => {
          this.deleteFeeds(id, item)
        }
      }, 
      {
        text: 'Share',
        handler: () => {
          this.shareSheetShare(description)
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  
  likePost(post, postId) {
  
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
    }  else {
    let myId = firebase.auth().currentUser.uid;
    let score;
    let likes = [];

    console.log("post: " + post.postId);
    for (let i = 0; i < this.feeditems.length; i++)
        if (this.feeditems[i].postId === postId) {
            console.log("POST FOUND and liked");
            this.feeditems[i].haveILiked = true;
            this.feeditems[i].score++;
            //this.haveILiked = true;
            break;
        }

    let Query = firebase.database().ref('/feeds/' + postId).once('value').then(function (snapshot) {
        likes = (snapshot.val() && snapshot.val().likes) || [];
        score = (snapshot.val() && snapshot.val().Score);
        likes.push(myId);
        score = score + 1;

        firebase.database().ref('/feeds/'  + postId).child('likes').set(likes);
        firebase.database().ref('/feeds/'  + postId).child('Score').set(score);
        });
      }
   });
 }

unlikePost(post, postId) {

      
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
      }  else {
    let myId = firebase.auth().currentUser.uid;
    let score;
    let likes = [];
    let updatedLikes = [];

    console.log("post: " + post.postId);
    for (let i = 0; i < this.feeditems.length; i++)
        if (this.feeditems[i].postId === postId) {
            console.log("POST FOUND and unliked");
            this.feeditems[i].haveILiked = false;
            this.feeditems[i].score--;
            //this.haveILiked = false;
            break;
        }

    let Query = firebase.database().ref('/feeds/'  + postId).once('value').then(function (snapshot) {
        likes = (snapshot.val() && snapshot.val().likes) || [];
        score = (snapshot.val() && snapshot.val().Score);
        likes.push(myId);


        for (let i = 0; i < likes.length; i++)
        {
            if (likes[i] != myId)
            {
                updatedLikes.push(likes[i]);
            }
        }

        score = score - 1;

        firebase.database().ref('/feeds/'  + postId).child('likes').set(updatedLikes);
        firebase.database().ref('/feeds/'  + postId).child('Score').set(score);
     });
  }
});
}

/*async getGallery(){
  let loader = await this.loadingCtrl.create({
    message: "Please wait..."
  });
  loader.present().then(() => {
    firebase.database().ref('/gallery_list/').orderByChild('userId').equalTo(firebase.auth().currentUser.uid).on('value', snapshot =>{
      this.shops = [];
      snapshot.forEach( snap =>{
        this.shops.push({
          id: snap.key,
          image: snap.val().image,
          displayName: snap.val().displayName,
          photoURL: snap.val().photoURL,
          commentLength: snap.val().commentLength,
          description: snap.val().description,
        });
      });
    });
    loader.dismiss();
  });

}*/

deleteImage(id){
  firebase.database().ref('/gallery_list/').child(id).remove()
}

goCoomys(id, commentLength){
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
    }  else {
       this.goComments(id, commentLength)
    }
  })
  firebase.auth().onAuthStateChanged( user => {
    if (user){
      this.currentUserId = user.uid
    } 
  })
}


goComments(id, commentLength){
  this.router.navigate(['/gallery-comment', {
    postId: id,
    commentLength: commentLength,
  }])
}

shareSheetShares(image) {
  this.socialSharing.share(image,"MopaysApp", null, this.shareUrl).then(() => {
    console.log("shareSheetShare: Success");
  }).catch(() => {
    console.error("shareSheetShare: failed");
  });
}

goJobs(){
  this.router.navigate(['/my-jobs'])
}

goEvents(){
  this.router.navigate(['/my-events'])
}

goItems(){
  this.router.navigate(['/my-items', {
    id: firebase.auth().currentUser.uid
  }])
}

goGroup(){
  this.router.navigate(['/my-groups'])
}



goBusiness(){
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
    }  else if(this.shopCreated == 'active') {
       this.router.navigate(['/business-my', {
         id: this.shopId
       }])
    } else {
      this.router.navigate(['/business-add'])
    }
  })

}



goSerivce(){
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        console.log("not login");
        this.router.navigate(['/login'])
    }  else if(this.serviceCreated == 'active') {
       this.router.navigate(['/service-my', {
         id: this.serviceId
       }])
    } else {
      this.router.navigate(['/service-add'])
    }
  })

}

}





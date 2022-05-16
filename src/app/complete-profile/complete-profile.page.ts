import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthsProvider } from '../services/auth';
import { Camera } from '@ionic-native/camera/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {
  user: any;
  email: string = '';
  password: string = '';
  name: string = '';
  image: number;
  //phone: number;
  error: string;
  userWantsToSignup: boolean = false;
  linkError: string = '';

  gender = '';
  about = '';
  nationality = '';
  dob = '';
  phoneNumber = '';
  format;
  photoURL;
  pic = 'assets/profile.jpg';  
  diff;
  marital = '';
  education = '';
  interestfor = '';
  refPost;
  favourItems;
  facebook = '';
  instagram = '';
  linkedin = '';
  tiktok = '';

  constructor(private toastController: ToastController, 
    public authService: AuthsProvider, public camera: Camera,
    public loadingController: LoadingController, 
    public actionSheetCtrl: ActionSheetController,
    private fireauth: AngularFireAuth, private router: Router) { }


  ngOnInit() {
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        //this.name = this.user.displayName,
        this.email = this.user.email,
        console.log(this.user);
      }
    })
    this.getFavourite();
  }

  updateAll(){
    this.updateUsername();
    this.updateAbout();
    this.updatePhone();
    this.updateDOB();
    this.updateCountry();
    this.updateGender();
    this.updateInterest();
    this.updateEducation();
    this.updateMarital();
    this.skip();
  }

  saveProfile(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      displayName: this.name,
      email: this.email,
      about: this.about,
      phoneNumber: this.phoneNumber,
      location: this.nationality,
      interestfor: this.interestfor,
      gender: this.gender,
      marital: this.marital,
      education: this.education,
      dob: this.dob,
      age: this.diff,
      facebook: this.facebook,
      instagram: this.instagram,
      linkedin: this.linkedin,
      tiktok: this.tiktok
    });
    this.presentToast('Your profile completed successfully', 'bottom', 3000);
    this.skip();
  }

  ionViewDidEnter(){
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        setTimeout(()=>{ 
          this.loaduserdetails(user.uid); 
        }, 3000);
      } 
    })
  }

  updateAbout(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      about: this.about
    })
    //this.presentToast('Update', 'bottom', 1000);
  }

  skip(){
    this.router.navigate(['/tabs/tab1'])
  }

  updatePhone(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      phoneNumber: this.phoneNumber
    })
    //this.presentToast('Update', 'bottom', 1000);
  }

  updateCountry(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      location: this.nationality
    })
    //this.presentToast('Update', 'bottom', 1000);
  }

  updateGender(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      gender: this.gender
    })
    //this.presentToast('Update', 'bottom', 1000);
  }

  updateDOB(){
    let a = moment();
    let b = moment(this.dob, 'YYYY');  
    this.diff = a.diff(b, 'years'); // calculates patient's age in years
    console.log(this.diff)
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      dob: this.dob,
      age: this.diff
    })
    //this.presentToast('Update', 'bottom', 1000);
  }

  loaduserdetails(id) {
    this.authService.getuserdetails(id).then((res: any) => {
      this.photoURL = res.photoURL;
      this.about = res.about;
      this.phoneNumber = res.phoneNumber;
      this.nationality = res.location;
      this.dob = res.dob;
      this.name = res.displayName,
      this.gender = res.gender;
      this.interestfor = res.interestfor
      this.marital = res.marital;
      this.education = res.education;
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
              //allowEdit: true,
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


/*onTrigger(){
  document.getElementById('file').click();
}*/

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

logOut(){
  firebase.auth().signOut().then(() => {
    this.router.navigate(['/auth'])
  })
}

  updateEmail() {
    this.user.updateEmail(this.email)
      .then(() => {
        this.updateEmailDatabase()
        //this.email = '';
        this.presentToast('Email updated', 'bottom', 1000);
        this.error = '';
        this.logOut()
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });

  }

  updateNameDatabase(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      displayName: this.name
    })
  }

  updateEmailDatabase(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      email: this.email
    })
  }

  getFavourite(){
    this.refPost = firebase.database().ref('/herefor')
    this.refPost.on('value', favourList =>{
    let favoursList = []; 
    favourList.forEach( feed => {
    favoursList.push({
      favorId: feed.key,
      name: feed.val().name,
    });  
      this.favourItems = favoursList;  
    }); 
  });     
  }
  
  updateInterest(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      interestfor: this.interestfor
    })
  }
  
 
  updateMarital(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      marital: this.marital
    })
  }
  
  updateEducation(){
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
      education: this.education
    })
  }
  

  updateUsername() {
    this.user.updateProfile({
      displayName: this.name
    })
      .then((data) => {
        this.updateNameDatabase()
        console.log(data);
        //his.name = '';
        this.presentToast('Username updated', 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updateImage() {
    this.user.updateProfile({
      photoURL: `https://picsum.photos/id/${this.image}/200/200`
    })
      .then((data) => {
        console.log(data);
        this.image = null;
        this.presentToast('Image updated', 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updatePassword() {
    this.user.updatePassword(this.password)
      .then(() => {
        this.password = '';
        this.presentToast('Password updated', 'bottom', 1000);
        this.error = '';
        this.logOut()
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
}

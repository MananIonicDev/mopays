import { Component } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, Platform} from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthsProvider } from '../services/auth';
import Swal from 'sweetalert2';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { login } from 'src/app/model/login';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtilityService } from '../services/utility';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
//import firebase auth.

import 'firebase/auth';
import { DataService } from '../services/data';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage    {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  /*public loginForm: FormGroup;
  public loading;
  user;
  userId;
  photoURL;
  email;
  displayName;
  userProfile: any = null;
  fblogin = 'facebook'*/

  login: login = { email: '', password: '' };
  submitted = false;
  isLogin: boolean = false;

    constructor(
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController, 
        public router: Router,
        public platform: Platform,
        public navCtrl: NavController,
        public fb: Facebook,
        public theInAppBrowser: InAppBrowser,
        public afAuth: AngularFireAuth,
        private oneSignal: OneSignal,
        public util: UtilityService,
        public api: AuthsProvider,
        public dataService: DataService,
        public toastCtrl: ToastController) {
      this.oneSignal.getIds().then((data) => {
      console.log('iddddd', data);
      localStorage.setItem('fcm', data.userId);
    });

    }
   
   
    async showAlert(message) {
      let alert = await this.alertCtrl.create({
        message: message,
        buttons: ["OK"]
      });
      alert.present();
    }

    onLogin(form: NgForm) {
      console.log('form', form);
  
      this.submitted = true;
      if (form.valid) {
        const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailfilter.test(this.login.email)) {
          this.util.showToast('Please enter valid email', 'danger', 'bottom');
          return false;
        }
        console.log('login');
        this.isLogin = true;
        this.api.login(this.login.email, this.login.password).then((userData) => {
          console.log(userData);
          if (userData && userData.uid) {
  
            //this.api.getProfile(userData.uid).then(data => {
              this.api.getUserProfile().on('value', snapshot => {
                let type = snapshot.val().type;
                let block = snapshot.val().block;
                this.isLogin = false;
              if (type === 'users') {
                if (block === false) {
                  localStorage.setItem('uid', userData.uid);
                  //localStorage.setItem('help', userData.uid);
                  let root  = this.dataService.getRoot();
                  if (root){
                    this.router.navigate([root]);
                  }
                  this.navCtrl.navigateRoot(['/tabs/tab1']);
                } else {
                  Swal.fire({
                    title: 'Error',
                    text: 'Your are blocked please contact administrator',
                    icon: 'error',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Need Help?',
                    backdrop: false,
                    background: 'white'
                  }).then(data => {
                    if (data && data.value) {
                      localStorage.setItem('help', userData.uid);
                      window.open('https://mopays.com/about/', '_blank');
                      this.api.logout().then(() => {
                        //this.navCtrl.navigateRoot(['login']);
                        console.log('Logout')
                      });
                    }
                  });
                  this.api.logout().then(() => {
                    //this.navCtrl.navigateRoot(['login']);
                    console.log('Logout')
                  });
                  // this.util.errorToast('Your are blocked please contact administrator');
                }
              } else {
                this.util.showToast('Access Denied', 'danger', 'bottom');
                this.api.logout().then(() => {
                  //this.navCtrl.navigateRoot(['login']);
                  console.log('Logout')
                });
              }
           
           })/*.catch(error => {
            this.isLogin = false;
            console.log(error);
            this.util.showToast(`${error}`, 'danger', 'bottom');
          });*/
          this.isLogin = false;
          }
        }).catch(err => {
          this.isLogin = false;
          if (err) {
            console.log(err);
            this.util.showToast(`${err}`, 'danger', 'bottom');
          }
        });
      }
    }
  
    goRegister(){
      this.router.navigate(['/login'])
    }

    Terms(){
      //window.open('https://www.myt.mu/sinformer/cinema', '_blank')
      let url = 'https://www.mopays.com/tos';
      let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
    }
  
  
    goBack(){
      this.navCtrl.pop()
    }
  
    goForgot(){
      this.router.navigate(['/forgot-password'])
    }

   
    /*async loginUser(loginForm: FormGroup): Promise<void> {
        if (!loginForm.valid) {
          console.log('Form is not valid yet, current value:', loginForm.value);
        } else {
          this.loading = await this.loadingCtrl.create();
          await this.loading.present();
  
          const email = loginForm.value.email;
          const password = loginForm.value.password;
    
          this.authData.loginUser(email, password)
            .then(() => this.successLogin(), error => this.errorLogin(error));
        }
      }*/
    
     
      navigationPage(){
        if( this.emailVerified()){
         this.router.navigate(['/tabs/home'])
        } else {
         this.SendVerificationMail()
         //alert('Please Check your Email to Verify your account');
        }
    }

    emailVerified(){
      return this.afAuth.currentUser.then(u => u.emailVerified)
      .then(() => {
        this.router.navigate(['/tabs/home'])
      })
    }

    SendVerificationMail() {
      return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        alert('Please Check your Email to Verify your account');
      })
    }

  /* private successLogin() {
     this.loading.dismiss()
       .then(() =>  this.navigationPage()); //this.navCtrl.setRoot('TabsPage'));
   }
    
      private errorLogin(error) {
        this.loading.dismiss().then(
          async () => {
            const alert =
              await this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'Ok', role: 'cancel' }],
              });
            await alert.present();
        });
      }*/
   
    goToResetPassword(): void {
      this.router.navigate(['/forgot-password'])
    }

    /*setdata(){
      firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
        displayName: firebase.auth().currentUser.displayName,
        photoURL: firebase.auth().currentUser.photoURL,
        uid: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
        points: 100,
        gender: '',
        about: '',
        location: '',
        type: 'users',
        block: false,
        IamFollowings: false,
        following: [],
        followingCount: 0,
        followers: [],
        followersCount: 0,
        nationality: '',
        dob: '',
        fcm_token: localStorage.getItem('fcm') ? localStorage.getItem('fcm') : '',
        phoneNumber: '',
    
      });
      
    }*/
    
  
    async FBlogin() {
      this.fb.login(['email'])
        .then((response: FacebookLoginResponse) => {
          this.onLoginSuccess(response);
          console.log(response.authResponse.accessToken);
        }).catch((error) => {
          console.log(error)
          alert('error:' + JSON.stringify(error))
        });
    }

    onLoginSuccess(res: FacebookLoginResponse) {
      // const { token, secret } = res;
      const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      this.afAuth.signInWithCredential(credential)
        .then((response) => {
          this.checkStatus()
          
        })
  
    }
    onLoginError(err) {
      console.log(err);
    }
   

    
     
          
  
           checkStatus() {
              this.api.getUserProfile().on('value', snapshot => {
                let type = snapshot.val().type;
                let block = snapshot.val().block;
                this.isLogin = false;
              if (type === 'users') {
                if (block === false) {
                  this.navCtrl.navigateRoot(['/']);
                } else {
                  Swal.fire({
                    title: 'Error',
                    text: 'Your are blocked please contact administrator',
                    icon: 'error',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Need Help?',
                    backdrop: false,
                    background: 'white'
                  }).then(data => {
                    if (data && data.value) {
                      window.open('https://mopays.com/about/', '_blank');
                      this.api.logout().then(() => {
                        //this.navCtrl.navigateRoot(['login']);
                        console.log('Logout')
                      });
                    }
                  });
                  this.api.logout().then(() => {
                    console.log('Logout')
                  });
                }
              } else {
                this.util.showToast('Access Denied', 'danger', 'bottom');
                this.api.logout().then(() => {
                  console.log('Logout')
                });
              }
           
            })
          this.isLogin = false;
          }
        
       

         /* setUserdata(){
            firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
              displayName: firebase.auth().currentUser.displayName,
              photoURL: firebase.auth().currentUser.photoURL,
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
              points: 100,
              gender: '',
              about: '',
              location: '',
              type: 'users',
              block: false,
              IamFollowings: false,
              following: [],
              followingCount: 0,
              followers: [],
              followersCount: 0,
              nationality: '',
              dob: '',
              fcm_token: localStorage.getItem('fcm') ? localStorage.getItem('fcm') : '',
              phoneNumber: '',
          
            });
            
          }


          async loginFB() {
            this.fb.login(['email'])
              .then((response: FacebookLoginResponse) => {
                this.onLoginSuccess(response);
                console.log(response.authResponse.accessToken);
              }).catch((error) => {
                console.log(error);
                alert('error:' + error);
              });
          }
        
          onLoginSuccess(res: FacebookLoginResponse) {
            // const { token, secret } = res;
            const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            this.afAuth.signInWithCredential(credential)
              .then((response) => {
                this.navCtrl.navigateRoot(['/']);
              });
          }*/
   
  
}







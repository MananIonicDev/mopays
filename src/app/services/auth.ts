import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Contact } from '../model/users';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

export class AuthInfo {
  constructor(public $uid: string) { }

  isLoggedIn() {
    return !!this.$uid;
  }
}


@Injectable({
    providedIn: 'root'
  })

export class AuthsProvider {

  static UNKNOWN_USER = new AuthInfo(null);

  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthsProvider.UNKNOWN_USER);

  firedata = firebase.database().ref('/users'); 
  firedataShop = firebase.database().ref('/booking_shop'); 
  fireProvider = firebase.database().ref('/service_provider');
  exploreProvider = firebase.database().ref('/explore_sample');
  public userProfile: any;
  public user: any;
  public phoneNumber: number;
  public id: any;
  public userID: any
  public fireAuth: any;
  public contacts: Contact[] = [];
  confirmationResult: firebase.auth.ConfirmationResult;
 
  constructor(private fire: AngularFireAuth) {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
       // console.log(user)
        this.user = user;
        //console.log(this.user)
        this.id = this.user.uid;
        this.userProfile = firebase.database().ref(`users/${user.uid}`);
        this.getUserProfile().on('value', userProfileSnapshot => {
         this.userID = userProfileSnapshot.val();
        })
      }
    });
    this.fireAuth = firebase.auth();


  }

  getUserProfile(){
    return this.userProfile;
  }

  public checkAuth() {
    return new Promise((resolve, reject) => {
      this.fire.onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          localStorage.setItem('uid', user.uid);
          resolve(user);
        } else {
          this.logout();
          localStorage.clear();
          resolve(false);
        }
      });
    });
  }

  public login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fire.signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            firebase.database().ref('users').child(res.user.uid).update({
              fcm_token: localStorage.getItem('fcm') ? localStorage.getItem('fcm') : ''
            });
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch(err => {
          this.authInfo$.next(AuthsProvider.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }

  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    return new Promise<any>((resolve, reject) => {

      this.fire.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error) => {
          console.log(error);
          reject('SMS not sent');
        });
    });
  }
  public async enterVerificationCode(code) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        console.log(result);
        const user = result.user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });

    });
  }

  public register(email: string, password: string, fullname: string, phone: string, status: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fire.createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            firebase.database().ref('users').child(res.user.uid).set({
              displayName: fullname,
              email: email,
              uid: res.user.uid,
              points: 100,
              gender: '',
              about: '',
              location: '',
              type: 'users',
              rate: false,
              block: false,
              IamFollowings: false,
              following: [],
              followingCount: 0,
              followers: [],
              followersCount: 0,
              nationality: '',
              dob: '',
              interestfor: '',
              marital: '',
              education: '',
              verified: status,
              fcm_token: localStorage.getItem('fcm') ? localStorage.getItem('fcm') : '',
              phoneNumber: phone,
              photoURL: "https://firebasestorage.googleapis.com/v0/b/login-2aa53.appspot.com/o/anon_user.gif?alt=media&token=723b0c9d-76a6-40ea-ba67-34e058447c0a",
            });
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch(err => {
          console.log(err)
          //this.authInfo$.next(AuthsProvider.UNKNOWN_USER);
          reject(`${err}`)
        });
    });
  }

  public logout(): Promise<void> {
    this.authInfo$.next(AuthsProvider.UNKNOWN_USER);
    // this.db.collection('users').doc(localStorage.getItem('uid')).update({ "fcm_token": firebase.firestore.FieldValue.delete() })
    return this.fire.signOut();
  }

  UpdateNumbers(number: number){
    return this.userProfile.update({
      phoneNumber: number,
    });
  }

  public getContactByUid(UserId: string): Contact {
    if (this.contacts) {
      return this.contacts.find(x => x.uid === UserId);
    } else {
      return null;
    }
  }

  logoutUser(): any{
    return this.fireAuth.signOut();
  }

 

  getUserDetail(id): any {
    return this.firedata.child(id);
  }

  public signupUserPhone(email: string, passsword: string, phone: number, displayName: string){
    return firebase.auth().createUserWithEmailAndPassword(email, passsword)
    .then(
      newUserCredential => this.successSignupUserPhone(newUserCredential, email, phone, displayName),
     error => this.errorSignupUser(error)
    );

  }

  public signupUser(email: string, passsword: string, displayName: string){
    return firebase.auth().createUserWithEmailAndPassword(email, passsword)
    .then(
      newUserCredential => this.successSignupUser(newUserCredential, email, displayName),
     error => this.errorSignupUser(error)
    );

  }

  private successSignupUser(newUserCredential, email, displayName){
    firebase.auth().currentUser.updateProfile({
      displayName: displayName,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-2aa53.appspot.com/o/anon_user.gif?alt=media&token=723b0c9d-76a6-40ea-ba67-34e058447c0a",
    }).then(() =>{
    firebase.database().ref(`/users/${newUserCredential.user.uid}`).set({
      displayName: displayName,
      email: email,
      uid: newUserCredential.user.uid,
      points: 100,
      notifications: true,
      gender: '',
      about: '',
      location: '',
      interestcat: '',
      rate: false,
      type: 'users',
      block: false,
      marital: '',
      IamFollowings: false,
      following: [],
      followingCount: 0,
      followers: [],
      followersCount: 0,
      groupCount: 0,
      interestedin: '',
      nationality: '',
      interestfor: '',
      education: '',
      dob: '',
      phoneNumber: '',
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-2aa53.appspot.com/o/anon_user.gif?alt=media&token=723b0c9d-76a6-40ea-ba67-34e058447c0a",
     })
   })
  }

  private successSignupUserPhone(newUserCredential, email, phone, displayName){
    firebase.auth().currentUser.updateProfile({
      displayName: displayName,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-2aa53.appspot.com/o/anon_user.gif?alt=media&token=723b0c9d-76a6-40ea-ba67-34e058447c0a",
    }).then(() =>{
    firebase.database().ref(`/users/${newUserCredential.user.uid}`).set({
        displayName: displayName,
        email: email,
        uid: newUserCredential.user.uid,
        points: 100,
        notifications: true,
        gender: '',
        about: '',
        location: '',
        interestcat: '',
        type: 'users',
        block: false,
        rate: false,
        marital: '',
        IamFollowings: false,
        following: [],
        followingCount: 0,
        followers: [],
        followersCount: 0,
        groupCount: 0,
        interestedin: '',
        nationality: '',
        interestfor: '',
        education: '',
        dob: '',
        phoneNumber: phone,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/login-2aa53.appspot.com/o/anon_user.gif?alt=media&token=723b0c9d-76a6-40ea-ba67-34e058447c0a",

     })
    })
  }

  private errorSignupUser(error){
    console.log(error)
    throw new Error(error)
  }

  public loginUser(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }


  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
 
 
  updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
        firebase.auth().currentUser.updateProfile({
              displayName: firebase.auth().currentUser.displayName,
              photoURL: imageurl      
          }).then(() => {
              firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
              displayName: firebase.auth().currentUser.displayName,
              photoURL: imageurl,
              Id: firebase.auth().currentUser.uid
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
          }).catch((err) => {
                reject(err);
             })  
      })
      return promise;
  }

  getuserdetails(id) {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(id).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }

  getshopdetails(id) {
    var promise = new Promise((resolve, reject) => {
    this.firedataShop.child(id).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }
  
  getProviderDetails(id){
    var promise = new Promise((resolve, reject) => {
      this.fireProvider.child(id).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
        })
      })
      return promise;
  }

  getExploreDetails(id){
    var promise = new Promise((resolve, reject) => {
      this.exploreProvider.child(id).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
        })
      })
      return promise;
  }
  

 
  updatePhone(phone){
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        phoneNumber: phone,
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    
    return promise;
  }


  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
        firebase.auth().currentUser.updateProfile({
      displayName: newname,
      photoURL: firebase.auth().currentUser.photoURL
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: firebase.auth().currentUser.photoURL,
        email: firebase.auth().currentUser.email,
        Id: firebase.auth().currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }


}



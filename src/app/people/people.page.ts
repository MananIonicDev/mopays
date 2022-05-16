import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../model/users';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController, ModalController, Platform } from '@ionic/angular';
import { ContactList } from '../model/userstwo';
import { ModalAgePage } from '../modal-age/modal-age.page';
import { ModalInterestPage } from '../modal-interest/modal-interest.page';


@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit  {
  
  @ViewChild(IonInfiniteScroll, { static: false }) inifiniteScroll: IonInfiniteScroll;
  public contacts: Contact[] = [];
  public contactsRef = firebase.database().ref('users/').orderByChild('type').equalTo('users');
  public contactsRefMale = firebase.database().ref('users/').orderByChild('gender').equalTo('Male');
  public contactsRefFemale = firebase.database().ref('users/').orderByChild('gender').equalTo('Female');
  public contactsRefTrans = firebase.database().ref('users/').orderByChild('gender').equalTo('Transgender');

  public contactallAgeOnline = firebase.database().ref('users/')

  public contactsRefMaleOff = firebase.database().ref('users/').orderByChild('gender').equalTo('Male');
  public contactsRefFemaleOff = firebase.database().ref('users/').orderByChild('gender').equalTo('Female');
  public contactsRefTransOff = firebase.database().ref('users/').orderByChild('gender').equalTo('Transgender');
  public contactsList: ContactList[] = [];
  //contactsList = [];
  term = '';
  dummy = Array(10);
  currentUserId: any;
  loading: any;
  lowerage;
  upperage;
  genderpick;
  interest;
  refuserPost;
  location;

  public lastKey: string = '';
  public lastsKey: string = '';
  public isFinished = false;
  dummyBook = Array(10);
  dummyBooks = Array(10);
  marital;

  

  constructor(public router: Router, public modalCtrl: ModalController,
    public platform: Platform, public loadingCtrl: LoadingController) {

  }

 
  /*goProfile(uid: string){
    this.router.navigate(['/users-details', {
      id: uid
    }])
  }*/

  

  goProfile(userId){
    if(this.currentUserId == userId){
      this.router.navigate(['/my-profile'])
    } else {
      this.router.navigate(['/users-details', {
        id: userId
      }])
    }
  }

  

  /*goProfile(userId){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          console.log("not login");
          this.router.navigate(['/login'])
      }  else {
         this.viewUserProfile(userId)
      }
    })

  }*/


 

  ngOnInit(){
    this.getAllPeople();
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUserId = user.uid
      } 
    })
  this.filterAgeOffline()
}



 getAllPeople(){
    this.contactsRef.once('value', contacts => {
      let contactsList = [];
      contacts.forEach(data => {
        contactsList.push({
          email: data.val().email,
          displayName: data.val().displayName,
          photoURL: data.val().photoURL,
          about: data.val().about,
          uid: data.val().uid,
          gender: data.val().gender,
          marital: data.val().marital,
          interestfor: data.val().interestfor,
          age: data.val().age,
          followersCount: data.val().followersCount,
        })
      });
       this.contactsList = contactsList;
       this.dummyBook = [];
    });
}


async filterAgeOffline(){
  const modal = await this.modalCtrl.create({
  component: ModalAgePage,
  //cssClass: 'half-modal'
});
modal.present();

//Get returned data
const { data } = await modal.onWillDismiss();
console.log('this is the data', data) 
 //this.location = data.address;
 this.lowerage = data.lower;
 this.upperage = data.upper;
 this.genderpick = data.gender;
 this.interest = data.interest;
 //this.location = data.location;
 this.marital = data.marital;
 console.log(this.lowerage, this.upperage, this.genderpick, this.interest, this.marital)
 if(data != null && this.lowerage && this.upperage && this.genderpick && this.interest == undefined && this.marital == undefined){
   this.getUserB(this.lowerage, this.upperage, this.genderpick)

 } else if(data != null && this.lowerage && this.upperage && this.interest && this.marital == undefined && this.genderpick == undefined){
   this.getUserC(this.lowerage, this.upperage, this.interest)


 }  else if(data != null && this.lowerage && this.upperage && this.marital && this.interest == undefined && this.genderpick == undefined){
   this.getUserD(this.lowerage, this.upperage, this.marital)

 } else if(data != null && this.lowerage && this.upperage && this.genderpick && this.interest && this.marital == undefined){
   this.getUserE(this.lowerage, this.upperage, this.genderpick, this.interest)


 } else if(data != null && this.lowerage && this.upperage && this.genderpick && this.marital && this.interest == undefined){
    this.getUserF(this.lowerage, this.upperage, this.genderpick, this.marital)

 }  else if(data != null && this.lowerage && this.upperage && this.interest && this.marital && this.genderpick == undefined){
    this.getUserG(this.lowerage, this.upperage, this.interest, this.marital)

 }  else if(data != null && this.lowerage && this.upperage && this.interest && this.marital && this.genderpick){
  console.log(this.lowerage, this.upperage, this.genderpick, this.interest, this.marital)
  this.getFavouriteOnline(this.lowerage, this.upperage, this.genderpick, this.interest, this.marital)
 }

 else{
  this.getUserA(this.lowerage, this.upperage)
   console.log('Nothing')
 }

}

async getUserB(lowerage, upperage, genderpick){

  this.loading = await this.loadingCtrl.create();
  await this.loading.present();

  this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
  this.refuserPost.on('value', favourList =>{

  let favoursList = []; 

  favourList.forEach( data => {
    favoursList.push({
      email: data.val().email,
      displayName: data.val().displayName,
      photoURL: data.val().photoURL,
      about: data.val().about,
      uid: data.val().uid,
      gender: data.val().gender,
      age: data.val().age,
      interestfor: data.val().interestfor,
      marital: data.val().marital,
      followersCount: data.val().followersCount,
    });  

    this.contactsList = favoursList.filter(contact => contact.gender == genderpick);

    this.loading.dismiss()   

    }); 
  }); 
}


async getUserC(lowerage, upperage, interest){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
 this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
 this.refuserPost.on('value', favourList =>{
 let favoursList = []; 
 favourList.forEach( data => {
   let interestfor = data.val().interestfor;
        if (interestfor === interest) {
           favoursList.push({
             email: data.val().email,
             displayName: data.val().displayName,
             photoURL: data.val().photoURL,
             about: data.val().about,
             uid: data.val().uid,
             gender: data.val().gender,
             age: data.val().age,
             interestfor: data.val().interestfor,
             marital: data.val().marital,
             followersCount: data.val().followersCount,
           });  
           this.contactsList = favoursList;
           this.loading.dismiss()
         // }
         }
       }); 
     }); 
}

async getUserD(lowerage, upperage, marital){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
 this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
 this.refuserPost.on('value', favourList =>{
 let favoursList = []; 
 favourList.forEach( data => {
      favoursList.push({
      email: data.val().email,
      displayName: data.val().displayName,
      photoURL: data.val().photoURL,
      about: data.val().about,
      uid: data.val().uid,
      gender: data.val().gender,
      age: data.val().age,
      interestfor: data.val().interestfor,
      marital: data.val().marital,
      followersCount: data.val().followersCount,
    });  
        this.contactsList = favoursList.filter(contact => contact.marital === marital);
        this.loading.dismiss()
  }); 
 }); 
}

async getUserE(lowerage, upperage, genderpick, interest){
  this.loading = await this.loadingCtrl.create();
   await this.loading.present();
  this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
  this.refuserPost.on('value', favourList =>{
  let favoursList = []; 
  favourList.forEach( data => {
    let interestfor = data.val().interestfor;
         if (interestfor === interest) {
            favoursList.push({
              email: data.val().email,
              displayName: data.val().displayName,
              photoURL: data.val().photoURL,
              about: data.val().about,
              uid: data.val().uid,
              gender: data.val().gender,
              age: data.val().age,
              interestfor: data.val().interestfor,
              marital: data.val().marital,
              followersCount: data.val().followersCount,
            });  
            this.contactsList = favoursList.filter(contact => contact.gender === genderpick);
            this.loading.dismiss()
          // }
          }
        }); 
      }); 
}

async getUserA(lowerage, upperage){
  this.loading = await this.loadingCtrl.create();
   await this.loading.present();
  this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
  this.refuserPost.on('value', favourList =>{
  let favoursList = []; 
  favourList.forEach( data => {
    favoursList.push({
      email: data.val().email,
      displayName: data.val().displayName,
      photoURL: data.val().photoURL,
      about: data.val().about,
      uid: data.val().uid,
      gender: data.val().gender,
      age: data.val().age,
      interestfor: data.val().interestfor,
      marital: data.val().marital,
      followersCount: data.val().followersCount,
    });  
    this.contactsList = favoursList
    this.loading.dismiss()
      }); 
    }); 
}

async getUserF(lowerage, upperage, genderpick, marital){
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
 this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
 this.refuserPost.on('value', favourList =>{
 let favoursList = []; 
 favourList.forEach( data => {
   let interestfor = data.val().interestfor;
   //let haveILiked = feed.val().haveILiked;
    //for (let i = 0; i < favourites.length; i++) {
        //if (interestfor === interestId) {
           favoursList.push({
             email: data.val().email,
             displayName: data.val().displayName,
             photoURL: data.val().photoURL,
             about: data.val().about,
             uid: data.val().uid,
             gender: data.val().gender,
             age: data.val().age,
             interestfor: data.val().interestfor,
             marital: data.val().marital,
             followersCount: data.val().followersCount,
           });  
           this.contactsList = favoursList.filter(contact => contact.gender === genderpick && contact.marital === marital);
           this.loading.dismiss()
         // }
        // }
       }); 
     }); 
}

async getUserG(lowerage, upperage, interest, marital){
  this.loading = await this.loadingCtrl.create();
   await this.loading.present();
  this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
  this.refuserPost.on('value', favourList =>{
  let favoursList = []; 
  favourList.forEach( data => {
    let interestfor = data.val().interestfor;
    //let haveILiked = feed.val().haveILiked;
     //for (let i = 0; i < favourites.length; i++) {
         if (interestfor === interest) {
            favoursList.push({
              email: data.val().email,
              displayName: data.val().displayName,
              photoURL: data.val().photoURL,
              about: data.val().about,
              uid: data.val().uid,
              gender: data.val().gender,
              age: data.val().age,
              interestfor: data.val().interestfor,
              marital: data.val().marital,
              followersCount: data.val().followersCount,
            });  
            this.contactsList = favoursList.filter(contact => contact.marital === marital);
            this.loading.dismiss()
          // }
          }
        }); 
      }); 
}

async getFavouriteOnline(lowerage, upperage, genderpick, interestId, marital){
   this.loading = await this.loadingCtrl.create();
   await this.loading.present();
  this.refuserPost = firebase.database().ref('/users').orderByChild('age').startAt(lowerage).endAt(upperage)
  this.refuserPost.on('value', favourList =>{
  let favoursList = []; 
  favourList.forEach( data => {
    let interestfor = data.val().interestfor;
    //let haveILiked = feed.val().haveILiked;
     //for (let i = 0; i < favourites.length; i++) {
         if (interestfor === interestId) {
            favoursList.push({
              email: data.val().email,
              displayName: data.val().displayName,
              photoURL: data.val().photoURL,
              about: data.val().about,
              uid: data.val().uid,
              gender: data.val().gender,
              age: data.val().age,
              interestfor: data.val().interestfor,
              marital: data.val().marital,
              followersCount: data.val().followersCount,
            });  
            this.contactsList = favoursList.filter(contact => contact.gender === genderpick && contact.marital === marital);
            this.loading.dismiss()
          // }
          }
        }); 
      }); 
     }

  

}
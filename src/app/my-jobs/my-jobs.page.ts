import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController, AlertController } from "@ionic/angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as firebase from 'firebase/app';

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}


@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.page.html',
  styleUrls: ['./my-jobs.page.scss'],
})
export class MyJobsPage    {

  id: any;
  public shopItems: Array<any> = [];
  public selectedItems: Array<any> = [];
  shopItem: AngularFireList<any>;
  shops: any = [];
  name;
  searchSelected;
  ref;
  dummy = Array(10);
  term = '';
  currentuserId;

  constructor(
    public database: AngularFireDatabase, public router: Router, 
    public route: ActivatedRoute, public navCtrl: NavController, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentuserId = user.uid
        this.ref = firebase.database().ref('jobs').orderByChild('userId').equalTo(user.uid)
        this.ref.on('value', resp => {
          this.shops = [];
          this.shops = snapshotToArray(resp);
          this.dummy = [];
          //this.userList = this.selectedItems;
        })
      }
    })

   

  }

 

  goToPostDetails(id){
    this.router.navigate(['/jobs-details', {
      id: id,
    }])
  }

  async presentConfirm(key) {
    let alert = await this.alertCtrl.create({
      header: 'Delete your Job',
      message: 'Are you sure you want to delete your Job?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes Delete',
          handler: () => {
            this.deleteJob(key)
          }
        }
      ]
    });
    alert.present();
  }

  deleteJob(key){
    firebase.database().ref('jobs').child(key).remove()
    this.navCtrl.pop()
    this.showToast('item deleted')
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }


  initializeItems() {
    this.shops = this.searchSelected
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.shops = this.shops.filter(data => {
        return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || data.jobId.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
 
}


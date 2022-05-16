import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActionSheetController, Platform, AlertController, NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-service-my',
  templateUrl: './service-my.page.html',
  styleUrls: ['./service-my.page.scss'],
})
export class ServiceMyPage implements OnInit {

  avatar = "assets/imgs/profile.jpg"
  height = 0;
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  @Output() onChangeScroll = new EventEmitter();

  itemProduct: AngularFireObject<any>;
  public itemsProduct: any = [];

  constructor(public platform: Platform, public route: ActivatedRoute, public router: Router, 
    public toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController, public db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) { 
    console.log(platform.height());
    this.height = platform.height() - 10;
    this.id = this.route.snapshot.paramMap.get('id');
  }

  

  deletePro(id, item){
    firebase.database().ref("/service_provider/" + this.id + '/product/' + id).remove().then(function (){})
    let index = this.itemsProduct.indexOf(item);
 if (index > -1) {
   this.itemsProduct.splice(index, 1);
 }

}

editProduct(id){
  this.router.navigate(['/service-image-edit', {
    id:id,
    shopId: this.id
  }])
}

  async presentActionSheet(id, item) {
    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Albums',
      buttons: [{
        text: 'Edit Product',
        //role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
          this.editProduct(id)
        }
      }, {
        text: 'Delete Product',
        handler: () => {
          console.log('Share clicked');
          this.deletePro(id, item)
        }
      },  {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  

  deleteShop(){
    let myId = firebase.auth().currentUser.uid
    firebase.database().ref('service_provider').child(this.id).remove()
    firebase.database().ref('users').child(myId).update({
      serviceCreated: '',
      serviceId: ''
    })
    this.navCtrl.pop()
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      header: 'Delete your Business',
      message: 'Are you sure you want to delete your Business?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteShop()
          }
        }
      ]
    });
    alert.present();
  }
 

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/service_provider/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        //this.images = data.images;
        this.items["$key"] = this.id;
      }
    })

  
    firebase.database().ref("/service_provider/" + this.id + '/product/').on('value', snapshot =>{
  		this.itemsProduct = [];
  		snapshot.forEach( snap =>{
  			this.itemsProduct.push({
          category: snap.val().category,
  			  id: snap.key,
	        name: snap.val().name,
	        image: snap.val().image,
	        description: snap.val().description,
  			});
  		});
  	});
  }

  logScrolling(event) {
    this.onChangeScroll.emit(event.detail.scrollTop < 200);
  }

  addProduct(){
    this.router.navigate(['/service-image-add', {
      id:this.id
    }])
  }

  editBusiness(){
    this.router.navigate(['/service-edit', {
      id:this.id
    }])
  }

}



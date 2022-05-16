import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ServiceCategorys } from '../services/service_provider';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.page.html',
  styleUrls: ['./service-edit.page.scss'],
})
export class ServiceEditPage implements OnInit {

  CategoriesList = [];
  format;
  bookingList;
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  

  constructor(public dataService: DataService, public navCtrl: NavController, public db: AngularFireDatabase,
    public modalCtrl: ModalController, public toastCtrl: ToastController, public route: ActivatedRoute) {

      this.id = this.route.snapshot.paramMap.get('id');
      this.bookingList = firebase.database().ref('/service_provider/' + this.id);
    
   }

  ngOnInit() {
    this.fetchCategorys();
    let catRes = this.dataService.getServiceCat();
    catRes.snapshotChanges().subscribe(res => {
      this.CategoriesList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CategoriesList.push(a as ServiceCategorys);
      })
    })

    this.id = this.route.snapshot.paramMap.get('id');
    this.item = this.db.object("/service_provider/" + this.id);
    this.item.valueChanges().subscribe((data: any) => {
      if (data != null) {
        this.items = data;
        //this.images = data.images;
        this.items["$key"] = this.id;
      }
    })

}

goSubmit(){
  this.bookingList.update({
    name: this.items.name,
    minimum: this.items.minimum,
    description: this.items.description,
    category: this.items.category,
    image: this.items.image,
    phoneNumber: this.items.phoneNumber,
    whatsapp: this.items.whatsapp,
    facebook: this.items.facebook,
  })
     this.navCtrl.pop();
     this.showToast('Successful Update'); 
}

async showToast(message) {
  let toast = await this.toastCtrl.create({
    message: message,
    duration: 3000,
  });
  toast.present();
}


fetchCategorys() {
  this.dataService.getServiceCat().valueChanges().subscribe(res => {
    console.log(res)
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
      this.items.image = (<FileReader>event.target).result;
    }
  }
}



}

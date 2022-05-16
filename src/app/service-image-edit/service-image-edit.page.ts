import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { ToastController, NavController } from '@ionic/angular';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-service-image-edit',
  templateUrl: './service-image-edit.page.html',
  styleUrls: ['./service-image-edit.page.scss'],
})
export class ServiceImageEditPage implements OnInit {

  id;
  name;
  price;
  format;
  description;
  productList;
  shopId;
  item: AngularFireObject<any>;
  public items: any = {};

  constructor(public route: ActivatedRoute, public navCtrl: NavController,
    public toastCtrl: ToastController, public db: AngularFireDatabase) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.shopId = this.route.snapshot.paramMap.get('shopId')
      this.item = this.db.object('/service_provider/' + this.shopId + '/product/' + this.id)
      this.item.valueChanges().subscribe((data: any) => {
        if (data != null) {
          this.items = data;
          //this.images = data.images;
          this.items["$key"] = this.id;
        }
      })
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  

  goUpdate(){
    firebase.database().ref('/service_provider/' + this.shopId + '/product/' + this.id).update({
      name: this.items.name,
      description: this.items.description,
      image: this.items.image,
    }).then((success) =>{
      //this.productList.child(newProduct.key).child('id').set(newProduct.key);
       this.navCtrl.pop();
       this.showToast('update Successfull');
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

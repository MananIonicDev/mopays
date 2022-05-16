import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-weather-set',
  templateUrl: './weather-set.page.html',
  styleUrls: ['./weather-set.page.scss'],
})
export class WeatherSetPage implements OnInit {

 public city: string;
 public country: string;

  constructor(
    public storage: Storage,
    public toastCtrl: ToastController) {

   

  }

  async saveForm() {
    let location = {
      city: this.city,
      country: this.country
    }
    this.storage.set('location', JSON.stringify(location));
    let toast = await this.toastCtrl.create({
      message: 'Changes was saved succesfully',
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  //ionViewWillEnter() {
  ngOnInit() {
     this.storage.get('location').then(res => {
      if (res != null) {
        let location = JSON.parse(res);
        this.city = location.city;
        this.country = location.country;
      } else {
        this.city = 'Curepipe';
        this.country = 'Mauritius';
      }
    })
  }


}

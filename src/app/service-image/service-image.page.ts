import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { CallNumber } from '@ionic-native/call-number/ngx';



@Component({
  selector: 'app-service-image',
  templateUrl: './service-image.page.html',
  styleUrls: ['./service-image.page.scss'],
})
export class ServiceImagePage implements OnInit {

  avatar = "assets/imgs/profile.jpg"
  height = 0;
  id;
  item: AngularFireObject<any>;
  public items: any = {};
  images = [];
  

  itemProduct: AngularFireObject<any>;
  public itemsProduct: any = [];
 

  constructor(public route: ActivatedRoute, public router: Router, 
    public db: AngularFireDatabase, public callNumber: CallNumber) { 
    
  }

  callNo(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
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

  goProduct(){
    this.router.navigate(['/booking-products', {
      id: this.id
    }])
  }

  
}


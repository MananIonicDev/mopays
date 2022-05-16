import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.page.html',
  styleUrls: ['./my-items.page.scss'],
})
export class MyItemsPage implements OnInit {

id;
public shopItems: Array<any> = [];
public selectedItems: Array<any> = [];
shopItem: AngularFireList<any>;
shops: any = [];
term = '';
sorting: any;

  constructor(public router: Router, public route: ActivatedRoute, 
    public database: AngularFireDatabase, public loadingCtrl: LoadingController) { 
    this.id = this.route.snapshot.paramMap.get('id');
    //this.name = this.route.snapshot.paramMap.get('name');
    //this.img = this.route.snapshot.paramMap.get('img');
    this.sorting = "7";

  }

  async ngOnInit() {
   
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present().then(() => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.shopItem = this.database.list("/items_sell");
      let subscription = this.shopItem
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((res: any) => {
          this.shopItems = res;
          console.log(res)
          for (var i = 0; i <= this.shopItems.length - 1; i++) {
            if (this.shopItems[i].userId == this.id) {
              this.selectedItems.push(this.shopItems[i]);
              this.shops = this.selectedItems;
               }
             }
          })
           loader.dismiss();
        });
     }

  goDetails(id){
    this.router.navigate(['/listing-details', {
      id:id
    }])
  }
 
  sort(){

    if(this.sorting === "1"){
    this.shops.sort(function(a, b){
    
      
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    });
    }
    else if(this.sorting === "2"){
    
    this.shops.sort(function(a, b){
    
      
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA > nameB) //sort string ascending
            return -1 
        if (nameA < nameB)
            return 1
        return 0 //default return value (no sorting)
    });
    
    }else if(this.sorting === "3"){
    
    
    this.shops.sort(function(a, b){
    
      
        var nameA=a.price, nameB=b.price
        //return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        return nameA - nameB;
    
    });
    }else if(this.sorting === "4"){
    
    this.shops.sort(function(a, b){
    
      
        var nameA=a.price, nameB=b.price
        //return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
        return nameB - nameA;
     
    });
    }else if(this.sorting === "5"){
    
    this.shops.sort(function(a, b){
    
        var nameA=a.timeStamp, nameB=b.timeStamp
        //return new Date(nameB.start).getTime() - new Date(nameA.start).getTime()
      return nameB - nameA;
    });
    }else if(this.sorting === "6"){
    
    this.shops.sort(function(a, b){
    
        var nameA=a.timeStamp, nameB=b.timeStamp
         return nameA - nameB;
     
    });
    }else{
    
    return 0
    }
    console.log(this.shops.length);
    }

}

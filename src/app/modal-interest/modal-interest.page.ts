import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-modal-interest',
  templateUrl: './modal-interest.page.html',
  styleUrls: ['./modal-interest.page.scss'],
})
export class ModalInterestPage implements OnInit {

  refPost;
  favourItems;
  interest
  dummyArray = Array(5);

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.getFavourite()
  }

  chooseItem(){
   this.modalCtrl.dismiss(this.interest)
  }

  getFavourite(){
    this.refPost = firebase.database().ref('/favourites')
    this.refPost.on('value', favourList =>{
    let favoursList = []; 
    favourList.forEach( feed => {
    favoursList.push({
      favorId: feed.key,
      name: feed.val().name,
    });  
      this.favourItems = favoursList;  
      this.dummyArray = [];
    }); 
  });     
}

}

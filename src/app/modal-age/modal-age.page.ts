
import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';

declare var google: any;

@Component({
  selector: 'app-modal-age',
  templateUrl: './modal-age.page.html',
  styleUrls: ['./modal-age.page.scss'],
})
export class ModalAgePage implements OnInit {

  age = { lower: 18, upper: 100 };
  maxAmount = 100;
  ageFilter;
  gender;
  genderMethod = [
    {name: 'Male', code: 'Male'},
    {name: 'Female', code: 'Female'},
    {name: 'Everyone', code: ''},
  ];
  genderpick = '';

  refPost;
  favourItems = [];
  interest;

  maritalMethod = [
    {name: 'Married', code: 'Married'},
    {name: 'Single', code: 'Single'},
    {name: 'Complicated', code: 'Complicated'},
  ];
  maritalpick = '';
  marital;

    autocompleteItems: any;
    autocomplete: any;
    acService:any;
    placesService: any;
    latitude: number;
    longitude: number;
    latlong: any;
    location: any;
    service = new google.maps.places.AutocompleteService();
  constructor(public viewCtrl: ModalController, public zone: NgZone) { }

  ngOnInit() {
     this.acService = new google.maps.places.AutocompleteService();        
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        }; 
        this.getFavourite()  
  }

  chooseItems() {
    if(this.age.lower && this.age.upper && !this.genderpick && !this.interest && !this.maritalpick){
      this.ageFilter = {lower: this.age.lower, upper: this.age.upper}
      this.viewCtrl.dismiss(this.ageFilter)

    } else if(this.age.lower && this.age.upper && this.genderpick && !this.interest && !this.maritalpick){
      this.ageFilter = {lower: this.age.lower, upper: this.age.upper, gender: this.genderpick}
      this.viewCtrl.dismiss(this.ageFilter)

    } else if (this.age.lower && this.age.upper && !this.genderpick && this.interest && !this.maritalpick){
      this.ageFilter = {lower: this.age.lower, upper: this.age.upper, interest: this.interest}
      this.viewCtrl.dismiss(this.ageFilter)

    } else if (this.age.lower && this.age.upper && !this.genderpick && !this.interest && this.maritalpick){
      this.ageFilter = {lower: this.age.lower, upper: this.age.upper, marital: this.maritalpick}
      this.viewCtrl.dismiss(this.ageFilter)

    } else if (this.age.lower && this.age.upper && this.genderpick && this.interest && !this.maritalpick){
      this.ageFilter = {lower: this.age.lower, upper: this.age.upper, gender: this.genderpick, interest: this.interest}
      this.viewCtrl.dismiss(this.ageFilter)

    }  else if(this.age.lower && this.age.upper && this.genderpick && !this.interest && this.maritalpick){
      this.ageFilter = {lower: this.age.lower, upper: this.age.upper, gender: this.genderpick, marital: this.maritalpick}
      this.viewCtrl.dismiss(this.ageFilter)

    }  else if(this.age.lower && this.age.upper && !this.genderpick && this.interest && this.maritalpick){
      this.ageFilter = {lower: this.age.lower, upper: this.age.upper, interest: this.interest, marital: this.maritalpick}
      this.viewCtrl.dismiss(this.ageFilter)

    } else if(this.age.lower && this.age.upper && this.genderpick && this.interest && this.maritalpick) {
       this.ageFilter = {lower: this.age.lower, upper: this.age.upper, gender: this.genderpick, interest: this.interest, marital: this.maritalpick}
       this.viewCtrl.dismiss(this.ageFilter); 
    } else {
      console.log('nothing')
    }
  }

  

  goDiss(){
    this.viewCtrl.dismiss();
  }

  getFavourite(){
    this.refPost = firebase.database().ref('/herefor')
    this.refPost.on('value', favourList =>{
    let favoursList = []; 
    favourList.forEach( feed => {
    favoursList.push({
      favorId: feed.key,
      name: feed.val().name,
    });  
      this.favourItems = favoursList;  
    }); 
  });     
}

   chooseItem(item: any) {
      //convert Address to lat and long
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': item }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      console.log("lat: " + this.latitude + ", long: " + this.longitude);
      this.location = item;
      this.autocompleteItems = [];
      this.autocomplete = {
        query: ''
       };
      //this.location = {lat: this.latitude, long: this.longitude, address: item}
      //this.viewCtrl.dismiss(this.location);
       });
    }
  
    updateSearch() {
      // Autocomplete search, if autocomplete query is empty return list of items in an array
      if (this.autocomplete.query == '') {
       this.autocompleteItems = [];
       return;
      }
     // Places prediction, you can add more to it
      let me = this;
      this.service.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: { country: 'MU' } 
      //componentRestrictions: {country: ['NG', "DZ", "AR", "AU", 'US', "AT", "AZ", "BS", "BH", "BD", "CV", "BE", "BR", "BF", "CM", "CA", "CL", "CN", "CR", "HR", "CU", "CZ", "DK", "EC", "EG", "ET", "FI", "FR", "GA", "GM", "DE", "GH", "IN", "ID", "IR", "IQ", "IL", "IT", "JM", "JP", "JO", "KE", "LB", "LR", "LY", "MW", "MY", "ML", "MX", "MA", "MZ", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NO", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "SA", "SG", "ZA", "ES", "LK", "SE", "CH", "SI", "TW", "TH", "TN", "TR", "GB", "UA", "AE", "UY", "US", "VE", "ZM", "ZW" ]}
     }, (predictions, status) => {
       me.autocompleteItems = [];
     me.zone.run(() => {
       if (predictions != null) {
          predictions.forEach((prediction) => {
            me.autocompleteItems.push(prediction.description);
          });
         }
       });
     });
    }

    Selectgender(index, code){
      this.gender = index
      console.log(this.gender, index)
      this.genderpick = code;
      console.log(this.genderpick)
    }

    Selectmarital(index, code){
      this.marital = index
      console.log(this.marital, index)
      this.maritalpick = code;
      console.log(this.maritalpick)
    }


   

}

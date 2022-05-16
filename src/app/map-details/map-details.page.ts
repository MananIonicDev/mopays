  import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
  import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
  import { ModalController, NavParams } from '@ionic/angular';//import { start } from 'repl';
  import { Router } from '@angular/router';
  import { ConnectionListernerProvider } from '../services/connections';
  import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
  
  
  // --- google local variable ---
  
  declare var google;
  let position;
  
  @Component({
    selector: 'app-map-details',
    templateUrl: './map-details.page.html',
    styleUrls: ['./map-details.page.scss'],
  })
  export class MapDetailsPage implements OnInit {
  
    // position members
    options: GeolocationOptions;
    currentPos: Geoposition;
  
    // --- array to hold places ---
    places: Array<any>;
    @ViewChild('map', {static: true}) mapElement: ElementRef;
    @ViewChild('directionsPanel', {static: true}) directionsPanel: ElementRef;
   // @ViewChild(RouterOutlet, {static: true}) outlet: RouterOutlet;
  
    // --- map variable ---
    map: any;
    placesList: any;
    end : any;
    start :any;
    nickname;
    current_location: any;
    photo;
    d;
    img;
    name;
  
    constructor(private modalController:ModalController, public router: Router,
      private geolocation: Geolocation, public navParams: NavParams, public connectivityService: ConnectionListernerProvider,
      private launchNavigator: LaunchNavigator) {
        this.nickname = this.navParams.get('nickname');
        this.img = this.navParams.get('image');
        this.name = this.navParams.get('name')
        console.log(this.nickname)
        
       }
  
     
    async closeModal(){
      await this.modalController.dismiss();
    }
  
    doRefresh(event) {
      this.ionViewDidEnter();
   
      console.log('Begin async operation');
   
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 1000);
    }
    
    ngOnInit() {
      this.ionViewDidEnter();
        /*this.router.events.subscribe(e => {
          if (e instanceof ActivationStart && e.snapshot.outlet === "outletname")
            this.outlet.deactivate();
        });*/
    }
  
  
    // method to get user position
    getUserPosition() {
      this.options = {
        enableHighAccuracy: false
      };
  
      let current: any;
  
      this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
  
        position = pos;
        this.currentPos = position;
  
        console.log(pos);
        this.start = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.addMap(pos.coords.latitude, pos.coords.longitude);
  
        //this.current_location = this.start;  //set user current latitude and longitude to the current context to be used later
        
       /* current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.getNearbyActivities(this.nickname, this.current_location, current);*/
        
  
      }, (err: PositionError) => {
        console.log("error : " + err.message);
        ;
      })
  
    }
  
  
    // loading page methods
    ionViewDidEnter() {
      this.getUserPosition();
    }
  
    // method to create the map
    addMap(latitude, longitude) {
  
      let latLng = new google.maps.LatLng(latitude, longitude);
  
      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //disableDefaultUI: true
      } 
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
      this.getBanks(latLng).then((results: Array<any>) => {
  
        this.places = results;
        let nearby_places = [];
  
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
          //console.log(results[i].name)
  
            //let photo = results[i].icon 
            let photo = this.img
            if (results[i].photos) {
              let photos_list = results[i].photos;
              photo = photos_list[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })
              console.log(photo)
            }
  
            console.log(results[i].geometry.location.lng(), results[i].geometry.location.lat())
  
            let lat = results[i].geometry.location.lat()
            let lng = results[i].geometry.location.lng()
  
            let units = 'm';
            let earthRadius = {
              miles: 3958.8,
              m: 6378137
            };
  
            let R = earthRadius[units];
            let lat1 = latitude;
            let lon1 = longitude;
            let lat2 = lat;
            let lon2 = lng;
  
            let dLat = (lat2 - lat1) * (Math.PI / 180);
            let dLon = (lon2 - lon1) * (Math.PI / 180);;
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((lat1) * (Math.PI / 180)) * Math.cos((lat2) * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let d = Math.round((R * c));
            console.log(d)
  
            let place_object = {
              name: results[i].name,
              distance: d,
              photo: photo,
              latitude: lat,
              longitude: lng,
              vicinity: results[i].vicinity,
              address: results[i].formatted_address,
              formatted_number: results[i].formatted_number,
            }
  
            //this.placesList.push(results[i].name, d, photo
            nearby_places.push(place_object)
            this.placesList = nearby_places
   
        }
        //this.placesList = nearby_places
      }, (status) => console.log(status));
  
      this.addMarker();
      
  
    }  
  
    
  
    // method to add a marker
    addMarker() {
  
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        }
      });
  
      let content = "<h5> You are here ! </h5>";
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
  
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
  
    }
  
    // get the list of banks
    getBanks(latLng) {
      var service = new google.maps.places.PlacesService(this.map);
      let request = {
        location: latLng,
        radius: 1000,
        keyword: [this.nickname],
        types: [this.nickname]
      };
      return new Promise((resolve, reject) => {
        service.nearbySearch(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
  
          } else {
            reject(status);
          }
  
        });
  
      });
    }
  
    // method to mark returned places
    createMarker(place) {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location,
        icon: { url: 'assets/mark.png', scaledSize: new google.maps.Size(50, 50) }
  
      });
  
      // --- method to create marker on the located branches ---
      this.end = place.vicinity;
      let content = place.name +  place.vicinity ;
      let infoWindow = new google.maps.InfoWindow({
        content: content, 
      });
  
      
    
  
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
        //this.launchNav(place.vicinity);
        function initMap() {
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
          });
  
          var marker = new google.maps.Marker({
            map: map,
            title: 'Click to zoom'
          });
  
          map.addListener('center_changed', function () {
            // 3 seconds after the center of the map has changed, pan back to the marker.
            window.setTimeout(function () {
              map.panTo(marker.getPosition());
            }, 3000);
          });
  
          marker.addListener('click', function () {
            map.setZoom(8);
            map.setCenter(marker.getPosition());
          });
        }
      });
    }
  
  
  launchNav(address)
  {
        // launch navigation 
        let options: LaunchNavigatorOptions = {
             app: this.launchNavigator.APP.GOOGLE_MAPS,
             start: "" + this.start,
        }
        
        this.launchNavigator.navigate(address, options)
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
  }
  
  
  
  
  }

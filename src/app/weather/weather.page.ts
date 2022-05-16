import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { LoadingController } from '@ionic/angular';
import { WeatherProviders } from '../services/weather';
import { Router } from '@angular/router';
import { LocationHandlerProvider } from '../services/location';

declare var google;

@Component({
  selector: "app-weather",
  templateUrl: "weather.page.html",
  styleUrls: ["weather.page.scss"],

})

export class WeatherPage implements OnInit {
  public weather: any;
  public location: {
    country: string,
    city: string
  }
  public WeatherForecast: any;
  public WeatherForecastNextWeek: any;
  public imgWeather = "https://openweathermap.org/img/w/01d.png";
  public titleNext: string = "Detailed forecast (5 days)";
  public titleNextWeek: string = "Next week forecast";
  banner = "assets/weather/weather.jpg";
  myCustomIcon = "/assets/weather/pressure.svg";

  anyAdress: any;
  locations: any;
  lat: number;
  long: number;

  city: string = '';


  constructor(public router: Router,
    public weatherProvider: WeatherProviders,
    public storage: Storage,
    public locationProvider: LocationHandlerProvider,
    public loadingCtrl: LoadingController) {

  }


  async ngOnInit() {
    let loader = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 1500
    });

    this.storage.get('location').then(res => {
      if (res != null) {
        this.location = JSON.parse(res);
      } else {
        this.location = {
          country: 'Mauritius',
          city: 'Curepipe'
        }
      }
      loader.present();
      this.currentLocation();


      this.weatherProvider.getWeather(this.location.country, this.location.city)
        .subscribe((data: any) => {
          console.log(data);
          this.weather = data;
          this.imgWeather = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        });

      this.weatherProvider.getWeatherForcast(this.location.country, this.location.city)
        .subscribe((res: any) => {
          console.log(res);
          this.WeatherForecast = res.list;
        });

      this.weatherProvider.getWeatherNextWeek(this.location.country, this.location.city)
        .subscribe((res: any) => {
          console.log('Next Week', res);
          this.WeatherForecastNextWeek = res.list;
        });

    })
  }

  goSearch() {
    this.weather = null;
    this.imgWeather = '';
    this.weatherProvider.getCityWeather(this.city)
      .subscribe((data: any) => {
        console.log(data);
        this.weather = data;
        this.imgWeather = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      });
    this.weatherProvider.getCityWeatherForcast(this.city)
      .subscribe((res: any) => {
        console.log(res);
        this.WeatherForecast = res.list;
      });
    this.anyAdress = this.city;
  }

  goSettings() {
    this.router.navigate(['/weather-set'])
  }

  currentLocation() {
    // Location sharing function
    this.locationProvider.getLocation().then((data) => {
      // geolocation detect the latitude and Longitude
      // Then google geocoder convert the latitude and longitude to address
      let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      let geocoder = new google.maps.Geocoder;
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      var request = {
        latLng: latLng,
      };
      geocoder.geocode(request, (results, status) => {
        //console.log(JSON.parse(results));
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            console.log(results[1]);
            // the formatted address is gotten
            //this.anyAdress = results[1].formatted_address;
            this.anyAdress = results[1].formatted_address;
          }
          if (results[0]) {
            console.log(results[0]);

          } else {
            console.log("Results not available");
          }
        }
        else {
          console.log("Geocoder failed due to: ", status);
        }
        // latitude, longitude and the address are sent to the chat list server on modal dismiss
        this.locations = { lat: data.coords.latitude, long: data.coords.longitude, address: this.anyAdress }
        console.log(this.anyAdress)
        console.log(data.coords.latitude, data.coords.longitude)
      })
    })
  }

}
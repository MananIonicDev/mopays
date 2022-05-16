import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})

export class LocationHandlerProvider {

constructor(public geolocation: Geolocation) {}

getLocation(): Promise<Geoposition> {
  console.log('get location');
  return this.geolocation.getCurrentPosition();
  }
}
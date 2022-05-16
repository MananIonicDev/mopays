import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WeatherProviders {
  private apiKey: string = 'c9bc106af8cbd1e68b656f42d7c80a18';
  private url: string = '';
  constructor(public http: HttpClient) {
    this.url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  }

  getWeather(country, city) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=metric&APPID=' + this.apiKey).
      pipe(
        map((res: Response) => {
          return res;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  getWeatherForcast(country, city) {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&units=metric&APPID=' + this.apiKey).
      pipe(
        map((res: Response) => {
          return res;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  getCityWeather(city) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=' + this.apiKey).
      pipe(
        map((res: Response) => {
          return res;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  getCityWeatherForcast(city) {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city  + '&units=metric&APPID=' + this.apiKey).
      pipe(
        map((res: Response) => {
          return res;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  getWeatherNextWeek(country, city) {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',' + country + '&units=metric&APPID=' + this.apiKey + '&cnt=7').
      pipe(
        map((res: Response) => {
          return res;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }




}